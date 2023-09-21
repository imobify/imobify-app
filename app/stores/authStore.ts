import { create } from 'zustand'
import jwtDecode from 'jwt-decode'
import { removeItem, setItem } from '../utils/asyncStorage'
import { AuthResponse, Signin, signinSchema, Signup, signupSchema } from '@models/auth'
import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

type AuthState = {
  token: string | null
  setUser: (token: string) => void
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
  user_type: number,
  iat: string
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  setUser: (token: string) => {
    const { user_type } = jwtDecode<JwtData>(token)

    set({ userType: user_type, token })
  },
  userType: undefined,
  authActions: {
    login: async (dto: Signin) => {
      try {
        const post = await signinSchema.validate(dto)
        const { data } = await axios.post<AuthResponse>(`${BASE_URL}/auth/signin`, post)
  
        if (!data) { 
          return 
        }
        
        const { user_type } = jwtDecode<JwtData>(data.access_token)
  
        await setItem('imobify-auth-token', JSON.stringify(data.access_token))
  
        set({ token: data.access_token, userType: user_type })
      } catch (error) {
        console.error('LOGIN', error)
        throw error
      }
    },
    register: async (dto: Signup) => {
      try {
        const post = await signupSchema.validate(dto)
        const { data } = await axios.post<AuthResponse>(`${BASE_URL}/auth/signup`, post)
  
        if (!data) { 
          return 
        }
        
        const { user_type } = jwtDecode<JwtData>(data.access_token)
  
        await setItem('imobify-auth-token', JSON.stringify(data.access_token))
  
        set({ token: data.access_token, userType: user_type })
      } catch (error) {
        console.error('REGISTER', error)
        throw error
      }
    },
    signOut: async () => {
      await removeItem('imobify-auth-token')
      set({ token: null, userType: undefined })
    }
  },
}))

// hooks

type useUser = {
  token: string | null
  setUser: (token: string) => void
  userType: number | undefined
}

export const useUser = (): useUser => useAuthStore(({ token, setUser, userType }) => ({ token, setUser, userType }))
export const useAuthActions = (): AuthActions => useAuthStore((state) => state.authActions)
