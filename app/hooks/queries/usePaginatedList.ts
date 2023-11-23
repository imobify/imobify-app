import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'

type FetchListFunction<T> = (take: number, cursor: number | undefined) => Promise<{
  content: T[]
  cursor: number | undefined
}>

export const usePaginatedList = <T>(resource: string, fetchFn: FetchListFunction<T>, take: number) => {
  return useInfiniteQuery(
    [`get-paginated-${resource}`, take],
    async ({ pageParam }: QueryFunctionContext) => 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fetchFn(take, pageParam),
    {
      
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.content.length < take) {
          return undefined
        }

        return lastPage?.cursor
      }
    }
  )
}