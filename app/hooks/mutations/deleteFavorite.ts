import { useMutation } from '@tanstack/react-query'
import { toggleFavoriteStatus } from '@services/favorites'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteFavoriteMutation = (onSucessFn: () => any) => useMutation({
  mutationFn: (variables: { favoriteId: number }) => toggleFavoriteStatus(variables),
  onSuccess: onSucessFn
})