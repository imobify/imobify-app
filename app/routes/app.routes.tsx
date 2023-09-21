import SeekerNavigator from './seeker.routes'
import AnnouncerNavigator from './announcer.routes'
import { useUser } from '@stores/authStore'

const AppNavigator: React.FC = () => {
  const { userType } = useUser()
  
  if (!userType) return null

  if (userType === 1) {
    return (
      <SeekerNavigator />
    )
  }

  if (userType === 2) {
    return (
      <AnnouncerNavigator />
    )
  }
}

export default AppNavigator
