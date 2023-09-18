import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useUser } from '../stores/authStore'
import Signin from '../screens/signin'
import Signup from '../screens/signup'
import PickType from '../screens/user-type'
import Access from '../screens/access'
import { SignupFormType } from '../screens/signup/schemas/signup-form'

export type AuthStackParamList = {
  access: undefined,
  signin: undefined,
  signup: undefined,
  'pick-type': SignupFormType
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator: React.FC = () => {
  const { token } = useUser()

  return (
    <Stack.Navigator 
      initialRouteName='access' 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="access"
        component={Access}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="signin"
        component={Signin}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="pick-type"
        component={PickType}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
