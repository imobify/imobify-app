import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

export const setItem = async (key: string, value: string) => {
  return await setItemAsync(key, value)
}

export const getItem = async <T>(key: string) => {
  const value = await getItemAsync(key)

  return value ? JSON.parse(value) as T : null
}

export const removeItem = async (key: string) => {
  return await deleteItemAsync(key)
}