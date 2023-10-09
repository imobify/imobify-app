import { User } from '@models/user'
import api from '../client'
import { useToastStore } from '@stores/toastStore'

export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/users/me')
  
    return data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar o perfil.')
    throw error
  }
}