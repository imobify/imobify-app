import { NavigationContainer } from '@react-navigation/native'
import { useIsAuthenticated } from '../stores/authStore'
import AppNavigator from './app.routes'
import AuthNavigator from './auth.routes'


const Navigation: React.FC = () => {
  const isLoggedIn = useIsAuthenticated()

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default Navigation
