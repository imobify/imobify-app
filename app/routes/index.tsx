import { NavigationContainer } from '@react-navigation/native'
import { useUser, useLoading } from '../stores/authStore'
import AppNavigator from './app.routes'
import AuthNavigator from './auth.routes'
import { useEffect } from 'react'
import { getItem } from '../utils/asyncStorage'
import SplashScreen from '../screens/SplashScreen'


const Navigation: React.FC = () => {
  const { loading, setLoading } = useLoading()
  const { token, setUser } = useUser()

  useEffect(() => {
    getItem<string>('imobify-auth-token')
      .then((token) => {
        if (token) {
          setUser(token)
        }

        setLoading(false)
      })
  }, [setLoading, setUser])

  const renderNavigation = () => {
    if (loading) {
      return (
        <SplashScreen />
      )
    }

    return token ? (
      <AppNavigator />
    ) : (
      <AuthNavigator />
    )
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  )
}

export default Navigation
