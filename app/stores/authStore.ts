import { create } from 'zustand'
import jwtDecode from 'jwt-decode'
import { removeItem, setItem } from '../utils/asyncStorage'
import { AuthResponse, Signin, SigninSchema, Signup, SignupSchema } from '../types/auth'
import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

type AuthState = {
  loading: boolean
  setLoading: (value: boolean) => void
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
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
  token: null,
  setUser: (token: string) => {
    const { user_type } = jwtDecode<JwtData>(token)

    set({ userType: user_type, token })
  },
  userType: undefined,
  authActions: {
    login: async (dto: Signin) => {
      const post = SigninSchema.parse(dto)
      const { data } = await axios.post<AuthResponse>(`${BASE_URL}/auth/signin`, post)

      if (!data) { 
        return 
      }
      
      const { user_type } = jwtDecode<JwtData>(data.access_token)

      await setItem('imobify-auth-token', JSON.stringify(data.access_token))

      set({ token: data.access_token, userType: user_type })
    },
    register: async (dto: Signup) => {
      const post = SignupSchema.parse(dto)
      const { data } = await axios.post<AuthResponse>(`${BASE_URL}/auth/signup`, post)

      if (!data) { 
        return 
      }
      
      const { user_type } = jwtDecode<JwtData>(data.access_token)

      await setItem('imobify-auth-token', JSON.stringify(data.access_token))

      set({ token: data.access_token, userType: user_type })
    },
    signOut: async () => {
      await removeItem('imobify-auth-token')
      set({ token: null, userType: undefined })
    }
  },
}))

// hooks

export const useLoading = () => useAuthStore(({ loading, setLoading }) => ({ loading, setLoading }))
export const useUser = () => useAuthStore(({ token, setUser, userType }) => ({ token, setUser, userType }))
export const useAuthActions = (): AuthActions => useAuthStore((state) => state.authActions)
