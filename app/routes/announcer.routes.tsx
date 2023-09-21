import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeNavigator from './home.routes'
import Profile from '@screens/shared/profile'
import Leads from '@screens/shared/leads'
import RealEstateList from '@screens/announcer/real-estates'

export type AnnouncerTabsParamList = {
  home: undefined,
  profile: undefined,
  leads: undefined,
  realEstateList: undefined
}

const Tab = createMaterialBottomTabNavigator<AnnouncerTabsParamList>()

const AnnouncerNavigator: React.FC = () => (
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
      name="realEstateList"
      component={RealEstateList}
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

export default AnnouncerNavigator
