import { getCurrentUser } from '@services/user'
import { useQuery } from '@tanstack/react-query'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['use-current-user'],
    queryFn: async () => await getCurrentUser()
  })
}