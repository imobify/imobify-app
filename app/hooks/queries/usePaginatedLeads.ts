import { useInfiniteQuery } from '@tanstack/react-query'
import { getPaginatedLeads } from '@services/leads'

export const usePaginatedLeads = (take: number) => {
  return useInfiniteQuery(
    ['get-paginated-leads', take],
    async ({ pageParam }) => 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      getPaginatedLeads(take, pageParam),
    {
      
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.leads.length < take) {
          return undefined
        }

        return lastPage?.cursor
      }
    }
  )
}