import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../screens/home'
import Profile from '../screens/profile'
import Leads from '../screens/leads'
import Favorites from '../screens/favorites'

const Tab = createMaterialBottomTabNavigator()

const AppNavigator: React.FC = () => (
  <Tab.Navigator 
    initialRouteName='Home'
    backBehavior='order'
    shifting={true}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Mapa',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-search-outline" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Meu Perfil',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="Leads"
      component={Leads}
      options={{
        tabBarLabel: 'Meus interesses',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="star-check" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" color={color} size={32} />
        )
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator
