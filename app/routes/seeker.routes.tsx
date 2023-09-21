import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Profile from '@screens/shared/profile'
import Leads from '@screens/shared/leads'
import Favorites from '@screens/seeker/favorites'
import HomeNavigator from './home.routes'

export type SeekerTabsParamsList = {
  home: undefined,
  leads: undefined,
  favorites: undefined
  profile: undefined,
}

const Tab = createMaterialBottomTabNavigator<SeekerTabsParamsList>()

const SeekerNavigator: React.FC = () => (
  <Tab.Navigator 
    initialRouteName='home'
    backBehavior='order'
    shifting={true}
  >
    <Tab.Screen
      name="home"
      component={HomeNavigator}
      options={{
        tabBarLabel: 'Mapa',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-search" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="leads"
      component={Leads}
      options={{
        tabBarLabel: 'Interesses',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="favorites"
      component={Favorites}
      options={{
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="profile"
      component={Profile}
      options={{
        tabBarLabel: 'Meu Perfil',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={32} />
        )
      }}
    />
  </Tab.Navigator>
)

export default SeekerNavigator
