import { NavigationContainer } from '@react-navigation/native'

import { useUser } from '../stores/authStore'
import AppNavigator from './app.routes'
import AuthNavigator from './auth.routes'

const Navigation: React.FC = () => {
  const { token, userType } = useUser()

  const renderNavigation = () => {
    if (!token) return <AuthNavigator />

    return userType === 1 ? (
      <AppNavigator />
    ) : (
      <AppNavigator />
    )
    // return token ? (
    //   <AppNavigator />
    // ) : (
    //   <AuthNavigator />
    // )
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  )
}

export default Navigation
