import Home from '@screens/shared/home'
import Leads from '@screens/shared/leads'
import Profile from '@screens/shared/profile'
import Favorites from '@screens/seeker/favorites'
import RealEstate from '@screens/shared/real-estate'
import EditProfile from '@screens/shared/edit-profile'
import RealEstateForm from '@screens/announcer/real-estate-form'
import RealEstateList from '@screens/announcer/real-estate-list'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommonNavigatorParams, FavoritesTabNavigatorParams, HomeTabNavigatorParams, LeadsTabNavigatorParams, ProfileTabNavigatorParams, RealEstateTabNavigatorParams } from '@routes/types'

// nested screens are shared across stacks

const CommonScreens = createNativeStackNavigator<CommonNavigatorParams>()

const commonScreens = (Stack: typeof CommonScreens) => {
  return (
    <>
      <HomeTab.Screen
        name="realEstate"
        getComponent={() => RealEstate}
      />
      <Stack.Screen
        name='realEstateForm'
        getComponent={() => RealEstateForm}
      />
      <Stack.Screen 
        name='editProfile'
        getComponent={() => EditProfile}
      />
    </>
  )
}

const HomeTab = createNativeStackNavigator<HomeTabNavigatorParams>()

export const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator
      initialRouteName='home' 
      screenOptions={{ headerShown: false }}
    >
      <HomeTab.Screen 
        name='home'
        getComponent={() => Home}
      />
      {commonScreens(HomeTab as typeof CommonScreens)}
    </HomeTab.Navigator>
  )
}

const LeadsTab = createNativeStackNavigator<LeadsTabNavigatorParams>()

export const LeadsTabNavigator = () => {
  return (
    <LeadsTab.Navigator
      initialRouteName='list' 
      screenOptions={{ headerShown: false }}
    >
      <LeadsTab.Screen 
        name='list'
        getComponent={() => Leads}
      />
      {commonScreens(LeadsTab as typeof CommonScreens)}
    </LeadsTab.Navigator>
  )
}

const FavoritesTab = createNativeStackNavigator<FavoritesTabNavigatorParams>()

export const FavoritesTabNavigator = () => {
  return (
    <FavoritesTab.Navigator
      initialRouteName='list' 
      screenOptions={{ headerShown: false }}
    >
      <FavoritesTab.Screen 
        name='list'
        getComponent={() => Favorites}
      />
      {commonScreens(FavoritesTab as typeof CommonScreens)}
    </FavoritesTab.Navigator>
  )
}

const RealEstateTab = createNativeStackNavigator<RealEstateTabNavigatorParams>()

export const RealEstateTabNavigator = () => {
  return (
    <RealEstateTab.Navigator
      initialRouteName='list' 
      screenOptions={{ headerShown: false }}
    >
      <RealEstateTab.Screen 
        name='list'
        getComponent={() => RealEstateList}
      />
      {commonScreens(RealEstateTab as typeof CommonScreens)}
    </RealEstateTab.Navigator>
  )
}

const ProfileTab = createNativeStackNavigator<ProfileTabNavigatorParams>()

export const ProfileTabNavigator = () => {
  return (
    <ProfileTab.Navigator
      initialRouteName='myProfile' 
      screenOptions={{ headerShown: false }}
    >
      <ProfileTab.Screen 
        name='myProfile'
        getComponent={() => Profile}
      />
      {commonScreens(ProfileTab as typeof CommonScreens)}
    </ProfileTab.Navigator>
  )
}