import { LocationObject } from 'expo-location'
import { getNearbyRealEstates } from '@services/real-estate'
import { useQuery } from '@tanstack/react-query'

export const useNearbyRealEstates = (coordinates: LocationObject | null) => {
  return useQuery({
    queryKey: ['nearby-real-estates', coordinates],
    queryFn: () => getNearbyRealEstates(coordinates),
    enabled: coordinates?.coords?.latitude !== undefined
  })
}