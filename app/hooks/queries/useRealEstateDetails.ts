import { getRealEstateById } from '@services/real-estate'
import { useQuery } from '@tanstack/react-query'

export const useRealEstateDetails = (id: number) => {
  return useQuery({
    queryKey: ['real-estate-detail', id],
    queryFn: async () => await getRealEstateById(id)
  })
}