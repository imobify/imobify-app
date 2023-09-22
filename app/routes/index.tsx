import { NavigationContainer } from '@react-navigation/native'

import AuthNavigator from './auth.routes'
import { useUser } from '../stores/authStore'
import configureAxios from '@services/client'
import SeekerNavigator from './seeker.routes'
import AnnouncerNavigator from './announcer.routes'

const Navigation: React.FC = () => {
  const { token, userType } = useUser()

  const renderNavigation = () => {
    if (!token) return <AuthNavigator />

    configureAxios()

    if (userType === 1) return <SeekerNavigator />

    if (userType === 2) return <AnnouncerNavigator />
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  )
}

export default Navigation
