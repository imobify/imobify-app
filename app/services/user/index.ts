import { User } from '@models/user'
import api from '../client'
import { useToastStore } from '@stores/toastStore'
import { generateRandomString } from '@utils/randomString'

export const getCurrentUser = async (): Promise<User | undefined> => {
  try {
    const { data } = await api.get<User>('/users/me')
  
    return data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar o perfil.')
  }
}

export const updateAvatar = async (data: { uri: string, userId: string }) => {
  try {
    const { uri, userId } = data

    const form = new FormData()

    form.append('avatar', {
      uri,
      name: generateRandomString(32),
      type: 'image/jpeg'
    } as unknown as Blob)

    const response = await api.post<{ avatar_url: string }>(`/users/${userId}/avatar`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.status
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível atualizar a foto de perfil.')
  }
}