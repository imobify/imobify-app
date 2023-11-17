import { theme } from '@theme'

import { AnnouncerTabNavigatorParams, SeekerTabNavigatorParams } from '@routes/types'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { FavoritesTabNavigator, HomeTabNavigator, LeadsTabNavigator, ProfileTabNavigator, RealEstateTabNavigator } from '@routes/navigators'

const AnnouncerTabs = createMaterialBottomTabNavigator<AnnouncerTabNavigatorParams>()

export const AnnouncerTabNavigator = () => {
  return (
    <AnnouncerTabs.Navigator
      initialRouteName='HomeTab'
      backBehavior='initialRoute'
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.secondary }}
      labelMaxFontSizeMultiplier={2}
    >
      <AnnouncerTabs.Screen 
        name='HomeTab'
        getComponent={() => HomeTabNavigator}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-search" color={color} size={32} />
          )
        }}
      />
      <AnnouncerTabs.Screen 
        name='LeadsTab'
        getComponent={() => LeadsTabNavigator}
        options={{
          tabBarLabel: 'Interesses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          )
        }}
      />
      <AnnouncerTabs.Screen 
        name='RealEstateTab'
        getComponent={() => RealEstateTabNavigator}
        options={{
          tabBarLabel: 'Meus imóveis',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-edit" color={color} size={32} />
          )
        }}
      />
      <AnnouncerTabs.Screen 
        name='ProfileTab'
        getComponent={() => ProfileTabNavigator}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          )
        }}
      />
    </AnnouncerTabs.Navigator>
  )
}

const SeekerTabs = createMaterialBottomTabNavigator<SeekerTabNavigatorParams>()

export const SeekerTabNavigator = () => {
  return (
    <SeekerTabs.Navigator
      initialRouteName='HomeTab'
      backBehavior='initialRoute'
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.secondary }}
      labelMaxFontSizeMultiplier={2}
    >
      <SeekerTabs.Screen 
        name='HomeTab'
        getComponent={() => HomeTabNavigator}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-search" color={color} size={32} />
          )
        }}
      />
      <SeekerTabs.Screen 
        name='LeadsTab'
        getComponent={() => LeadsTabNavigator}
        options={{
          tabBarLabel: 'Interesses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-alert" color={color} size={32} />
          )
        }}
      />
      <SeekerTabs.Screen 
        name='FavoritesTab'
        getComponent={() => FavoritesTabNavigator}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={32} />
          )
        }}
      />
      <SeekerTabs.Screen 
        name='ProfileTab'
        getComponent={() => ProfileTabNavigator}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          )
        }}
      />
    </SeekerTabs.Navigator>
  )
}