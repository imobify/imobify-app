import { useUser } from '@stores/authStore'
import Signin from '@screens/shared/signin'
import Signup from '@screens/shared/signup'
import Access from '@screens/shared/access'
import PickType from '@screens/shared/user-type'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthStackParamList } from './types'
import { AnnouncerTabNavigator, SeekerTabNavigator } from './tabs'

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = () => {
  const { token } = useUser()

  return (
    <AuthStack.Navigator 
      initialRouteName='access' 
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        name="access"
        component={Access}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <AuthStack.Screen
        name="signin"
        component={Signin}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <AuthStack.Screen
        name="signup"
        component={Signup}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <AuthStack.Screen
        name="userType"
        component={PickType}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
    </AuthStack.Navigator>
  )
}

const Navigation = () => {
  const { token, userType } = useUser()

  const renderNavigation = () => {
    if (!token) return <AuthNavigator />

    if (userType === 1) return <SeekerTabNavigator />

    if (userType === 2) return <AnnouncerTabNavigator />
  }

  return (
    <NavigationContainer>
      {renderNavigation()}
    </NavigationContainer>
  )
}

export default Navigation