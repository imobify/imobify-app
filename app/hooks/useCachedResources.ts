/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import { getItem } from '../utils/asyncStorage'
import { useUser } from '../stores/authStore'

SplashScreen.preventAutoHideAsync()

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const { setUser } = useUser()

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))

        const token = await getItem<string>('imobify-auth-token')

        if (token) {
          setUser(token)
        }

        await Font.loadAsync({
          'Baloo': require('../../assets/fonts/Baloo-Regular.ttf'),
        })

        setLoadingComplete(true)
        SplashScreen.hideAsync()
      } catch (e) {
        console.warn(e)
      } 
    }
    loadResourcesAndDataAsync()
  }, [setUser])

  return isLoadingComplete
}