import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useUser } from '@stores/authStore'
import Profile from '@screens/shared/profile'
import EditProfile from '@screens/shared/edit-profile'

export type ProfileStackParamList = {
  userProfile: undefined,
  editProfile: { 
    id: string | undefined
    name: string | undefined
    document: string | undefined
    email: string | undefined
    phone: string | undefined
  }
}

const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileNavigator: React.FC = () => {
  const { token } = useUser()

  return (
    <Stack.Navigator 
      initialRouteName='userProfile' 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="userProfile"
        component={Profile}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
