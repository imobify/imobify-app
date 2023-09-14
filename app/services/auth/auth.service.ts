/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useAuthStore } from '../../stores/authStore'
import apiClient from '../client'
import {
  type Signup, SignupSchema, type Signin, SigninSchema, AuthResponse } from '../../types/auth'

const { signIn, signOut } = useAuthStore.getState().actions

export const Login = async (signinDto: Signin): Promise<void> => {
  try {
    const data = SigninSchema.parse(signinDto)
    const response = await apiClient.post<AuthResponse>('/auth/signin', data)

    const { access_token } = response.data
    signIn(access_token)
  } catch (error) {
    console.error(error)
  }
}

export const signUp = async (signupDto: Signup): Promise<void> => {
  try {
    const data = SignupSchema.parse(signupDto)
    const response = await apiClient.post<AuthResponse>('/auth/signup', data)

    const { access_token } = response.data
    signIn(access_token)
  } catch (error) {
    console.error(error)
  }
}

export const logOut = (): void => {
  try {
    signOut()
  } catch (error) {
    console.error(error)
  }
}
