import { GetNearResponse } from '@models/realEstate'
import axios from 'axios'

export type Coordinates = {
  latitude: number
  longitude: number
}

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const getNearbyRealEstates = async (coordinates: Coordinates | undefined) => {
  const response = await axios.get<GetNearResponse>(`${API_URL}/real-estate/near`, { params: coordinates })

  return response.data
}