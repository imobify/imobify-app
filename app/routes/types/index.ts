import { ParsedRealEstate } from '@utils/parseRealEstate'
import { SignupFormType } from '@screens/shared/signup/schemas/signup-form'

export type AuthStackParamList = {
  access: undefined,
  signin: undefined,
  signup: undefined,
  userType: SignupFormType
}

export type CommonNavigatorParams = {
  realEstate: { id: number }
  realEstateForm: { id: number | undefined, data: ParsedRealEstate },
  editProfile: {
    id: string
    initialValues: {
      name: string
      document: string
      email: string
      phone: string
      password: string
      confirmPassword: string
    }
  },
  editAvatar: {
    avatar: string
  }
}

export type HomeTabNavigatorParams = CommonNavigatorParams & {
  home: undefined,
  realEstate: { id: number }
}

export type LeadsTabNavigatorParams = CommonNavigatorParams & {
  list: undefined
}

export type FavoritesTabNavigatorParams = CommonNavigatorParams & {
  list: undefined
}

export type RealEstateTabNavigatorParams = CommonNavigatorParams & {
  list: undefined
}

export type ProfileTabNavigatorParams = CommonNavigatorParams & {
  myProfile: undefined
}

export type AnnouncerTabNavigatorParams = CommonNavigatorParams & {
  HomeTab: undefined
  LeadsTab: undefined
  RealEstateTab: undefined
  ProfileTab: undefined
}

export type SeekerTabNavigatorParams = CommonNavigatorParams & {
  HomeTab: undefined
  LeadsTab: undefined
  FavoritesTab: undefined
  ProfileTab: undefined
}