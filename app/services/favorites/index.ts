import { Favorite } from '@models/favorites'
import { useToastStore } from '@stores/toastStore'
import { PaginatedFavorite } from '@models/favorites'

import api from '../client'

export const getPaginatedFavorites = async (take: number, cursor: number | undefined): Promise<{content: PaginatedFavorite[], cursor: number | undefined}> => {
  try {
    const { data } = await api.get<PaginatedFavorite[]>('/favorites', {
      params: {
        take,
        ...(cursor ? { cursor } : {})
      }})

    return {
      content: data,
      cursor: data[data.length - 1]?.id || undefined
    }
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar a lista de favoritos.')
    throw error
  }
}

export const toggleFavoriteStatus = async (data: {realEstateId?: number, favoriteId?: number }): Promise<Favorite | undefined> => {
  const { realEstateId, favoriteId } = data

  if (realEstateId !== undefined) {
    const post = {
      realEstate_id: realEstateId
    }

    const response = await api.post<Favorite>('/favorites', post)

    return response.data
  } else if (favoriteId !== undefined) {
    await api.delete(`/favorites/${favoriteId}`)

    return
  }
}