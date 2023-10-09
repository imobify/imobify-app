import { useAuthStore } from '@stores/authStore'
import { useToastStore } from '@stores/toastStore'
import { getItem } from '@utils/asyncStorage'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
})

client.interceptors.request.use(
  async (config) => {
    const token = await getItem<string>('imobify-auth-token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
)

client.interceptors.response.use(
  (res) => res,
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error?.response?.status === 401) {
      useToastStore.getState().show('Erro na autenticação, faça login novamente.')
      useAuthStore.getState().authActions.signOut()
    }
  }
)

export default client