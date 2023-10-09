/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeNavigator from './home.routes'
import Leads from '@screens/shared/leads'
import RealEstateList from '@screens/announcer/real-estates'
import { theme } from '@theme'
import EditRealEstate from '@screens/announcer/edit-real-estate'
import ProfileNavigator from './profile.routes'

export type RealEstateStackParamList = {
  list: undefined,
  edit: { id: number }
}

const RealEstateStack = createNativeStackNavigator<RealEstateStackParamList>()

const RealEstateNavigator: React.FC = () => {
  return (
    <RealEstateStack.Navigator
      initialRouteName='list' 
      screenOptions={{ headerShown: false }}
    >
      <RealEstateStack.Screen
        name='list'
        component={RealEstateList}
      />
      <RealEstateStack.Screen
        name='edit'
        component={EditRealEstate}
      />
    </RealEstateStack.Navigator>
  )
}

export type AnnouncerTabsParamList = {
  home: undefined,
  profile: undefined,
  leads: undefined,
  realEstateRoutes: undefined
}

const Tab = createMaterialBottomTabNavigator<AnnouncerTabsParamList>()

const AnnouncerNavigator: React.FC = () => (
  <Tab.Navigator 
    initialRouteName='home'
    backBehavior='order'
    shifting={true}
    activeColor={theme.colors.primary}
    inactiveColor={theme.colors.primary}
    barStyle={{ backgroundColor: theme.colors.secondary }}
    labelMaxFontSizeMultiplier={2}
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
          <MaterialCommunityIcons name="home-alert" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="realEstateRoutes"
      component={RealEstateNavigator}
      options={{
        tabBarLabel: 'Meus imóveis',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-edit" color={color} size={32} />
        )
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileNavigator}
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
