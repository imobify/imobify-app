import { useInfiniteQuery } from '@tanstack/react-query'
import { getPaginatedFavorites } from '@services/favorites'

export const usePaginatedFavorites = (take: number) => {
  return useInfiniteQuery(
    ['get-paginated-favorites', take],
    async ({ pageParam }) => 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      getPaginatedFavorites(take, pageParam),
    {
      
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.favorites.length < take) {
          return undefined
        }

        return lastPage?.cursor
      }
    }
  )
}