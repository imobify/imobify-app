import { AuthResponse, Signin, Signup, signinSchema, signupSchema } from '@models/auth'
import { useToastStore } from '@stores/toastStore'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL
})

export const signup = async (dto: Signup): Promise<AuthResponse> => {
  try {
    const post = await signupSchema.validate(dto)
    const { data } = await client.post<AuthResponse>('/auth/signup', post)

    return data
  } catch (error) {
    console.error('SIGNUP', error)
    useToastStore.getState().show('Erro na autenticação, tente novamente.')
    throw error
  }
}

export const signin = async (dto: Signin): Promise<AuthResponse> => {
  try {
    const post = await signinSchema.validate(dto)
    const { data } = await client.post<AuthResponse>('/auth/signin', post)

    return data
  } catch (error) {
    console.error('SIGNIN', error)
    useToastStore.getState().show('Erro na autenticação, faça login novamente.')
    throw error
  }
}