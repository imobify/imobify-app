import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from './seeker.routes'
import AuthNavigator from './auth.routes'
import { useUser } from '../stores/authStore'

const Navigation: React.FC = () => {
  const { token } = useUser()

  const renderNavigation = () => {
    if (!token) return <AuthNavigator />

    return (
      <AppNavigator />
    )
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  )
}

export default Navigation
