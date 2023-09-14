import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import jwtDecode from 'jwt-decode'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

type AuthState = {
  isLoggedIn: boolean
  token: string | null
  userId: string | undefined
  actions: AuthStateActions
};

type AuthStateActions = {
  signIn: (token: string) => void
  signOut: () => void
};

type JwtData = {
  sub: string,
  iat: string
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      userId: undefined,
      actions: {
        signIn: (token: string) => {
          if (!token) { 
            return 
          }
          
          const jwt = jwtDecode<JwtData>(token)

          set({ isLoggedIn: true, token, userId: jwt.sub })
        },
        signOut: () => {
          set({ isLoggedIn: false, token: null, userId: undefined })
        },
      },
    }),
    {
      name: 'imobify-app-auth-store',
      storage: createJSONStorage(() => ({
        setItem: setItemAsync,
        getItem: getItemAsync,
        removeItem: deleteItemAsync,
      })),
    },
  ),
)

// hooks

export const useIsAuthenticated = (): boolean => useAuthStore((state) => state.isLoggedIn)
export const useToken = (): string | null => useAuthStore((state) => state.token)
export const useUserID = (): string | undefined => useAuthStore((state) => state.userId)
export const useActions = (): AuthStateActions => useAuthStore((state) => state.actions)
