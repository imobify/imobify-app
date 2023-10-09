import { create } from 'zustand'
import jwtDecode from 'jwt-decode'
import { removeItem, setItem } from '../utils/asyncStorage'
import { Signin, Signup } from '@models/auth'
import { signin, signup } from '@services/auth'

type AuthState = {
  token: string | null
  setUser: (token: string) => void
  userId: string | undefined
  userType: number | undefined
  authActions: AuthActions
};

type AuthActions = {
  login: (dto: Signin) => Promise<void>
  register: (dto: Signup) => Promise<void>
  signOut: () => Promise<void>
};

type JwtData = {
  sub: string,
  type_id: number,
  iat: string
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  userId: undefined,
  setUser: (token: string) => {
    const { sub, type_id } = jwtDecode<JwtData>(token)

    set({ userType: type_id, token, userId: sub })
  },
  userType: undefined,
  authActions: {
    login: async (dto: Signin) => {
      const data = await signin(dto)
        
      const { sub, type_id } = jwtDecode<JwtData>(data.access_token)
  
      await setItem('imobify-auth-token', JSON.stringify(data.access_token))
  
      set({ token: data.access_token, userType: type_id, userId: sub })
    },
    register: async (dto: Signup) => {
      const data = await signup(dto)
      
      const { sub, type_id } = jwtDecode<JwtData>(data.access_token)

      await setItem('imobify-auth-token', JSON.stringify(data.access_token))

      set({ token: data.access_token, userType: type_id, userId: sub })
    },
    signOut: async () => {
      await removeItem('imobify-auth-token')

      set({ token: null, userType: undefined, userId: undefined })
    }
  },
}))

// hooks

type useUser = {
  token: string | null
  setUser: (token: string) => void
  userType: number | undefined
  userId: string | undefined
}

export const useUser = (): useUser => useAuthStore(({ token, setUser, userType, userId }) => ({ token, setUser, userType, userId }))
export const useAuthActions = (): AuthActions => useAuthStore((state) => state.authActions)
