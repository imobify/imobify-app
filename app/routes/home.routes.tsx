import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useUser } from '@stores/authStore'
import Home from '@screens/shared/home'
import RealEstate from '@screens/shared/real-estate'

export type HomeStackParamsList = {
  map: undefined,
  realEstate: { id: number }
}

const Stack = createNativeStackNavigator<HomeStackParamsList>()

const HomeNavigator: React.FC = () => {
  const { token } = useUser()

  return (
    <Stack.Navigator 
      initialRouteName='map' 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="map"
        component={Home}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="realEstate"
        component={RealEstate}
        options={{
          animationTypeForReplace: token ? 'push' : 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator
