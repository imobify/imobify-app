import { getPaginatedRealEstates } from '@services/real-estate'
import { useInfiniteQuery } from '@tanstack/react-query'

export const usePaginatedRealEstates = (take: number) => {
  return useInfiniteQuery(
    ['get-paginated-real-estates', take],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    async ({ pageParam }) => getPaginatedRealEstates(take, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.realEstates.length < take) {
          return undefined
        }

        return lastPage?.cursor
      }
    }
  )
}