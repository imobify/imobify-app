import axios, { AxiosError } from 'axios'
import { useAuthStore } from '../stores/authStore'

const { token } = useAuthStore.getState()

const HTTP_STATUS_UNAUTHORIZED = 401

const API_URL = process.env.EXPO_PUBLIC_API_URL

const apiClient = axios.create({
  baseURL: API_URL
})

apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => (response),
  (error) => {
    if (error instanceof AxiosError && ((error?.status) != null) && error.status === HTTP_STATUS_UNAUTHORIZED) {
      useAuthStore.getState().authActions.signOut()
    }
  },
)

export default apiClient
