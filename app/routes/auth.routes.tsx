import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useUser } from '../stores/authStore'
import Signin from '../screens/signin'
import Signup from '../screens/signup'
import PickType from '../screens/user-type'
import Access from '../screens/access'
import { SignupForm } from '../screens/signup/schemas/signup-form'

export type AuthStackParamList = {
  SigninOrRegister: undefined,
  Signin: undefined,
  Signup: undefined,
  PickType: SignupForm
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator: React.FC = () => {
  const { token } = useUser()

  return (
    <Stack.Navigator 
      initialRouteName='SigninOrRegister' 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SigninOrRegister"
        component={Access}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="PickType"
        component={PickType}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
