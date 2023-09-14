import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useIsAuthenticated } from '../stores/authStore'
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'
import PickType from '../screens/PickType'

const Stack = createNativeStackNavigator()

const AuthNavigator: React.FC = () => {
  const isLoggedIn = useIsAuthenticated()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="PickType"
        component={PickType}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
