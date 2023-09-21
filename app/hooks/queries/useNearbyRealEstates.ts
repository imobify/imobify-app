import { Coordinates, getNearbyRealEstates } from '@services/real-estate'
import { useQuery } from '@tanstack/react-query'

export const useNearbyRealEstates = (coordinates: Coordinates | undefined) => {
  return useQuery({
    queryKey: ['nearby-real-estates', coordinates],
    queryFn: () => getNearbyRealEstates(coordinates),
    enabled: coordinates !== undefined
  })
}