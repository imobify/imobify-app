import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useUser } from '../stores/authStore'
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'
import PickType from '../screens/PickType'

const Stack = createNativeStackNavigator()

const AuthNavigator: React.FC = () => {
  const { token } = useUser()

  return (
    <Stack.Navigator>
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
