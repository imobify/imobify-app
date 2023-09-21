import axios from 'axios'
import { useAuthStore } from '@stores/authStore'

const configureAxios = () => {
  const { token } = useAuthStore.getState()

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default configureAxios
