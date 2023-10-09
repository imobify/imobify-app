import { GetNearResponse, RealEstate } from '@models/realEstate'
import api from '../client'
import { PaginatedRealEstate } from '@models/realEstate/PaginatedRealEstate'
import { useToastStore } from '@stores/toastStore'
import { LocationObject } from 'expo-location'

export const getNearbyRealEstates = async (coordinates: LocationObject | null) => {
  try {
    const { data } = await api.get<GetNearResponse>('/real-estate/near', { 
      params: {
        longitude: coordinates?.coords.longitude,
        latitude: coordinates?.coords.latitude,
        distance: 15000
      }})
  
    return data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Um erro ocorreu, tente novamente.')
    throw error
  }
}

export const getRealEstateById = async (id: number): Promise<RealEstate> => {
  try {
    const { data } = await api.get<RealEstate>(`/real-estate/${id}`)
  
    return data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar o imóvel.')
    throw error
  }
}

export const getPaginatedRealEstates = async (take: number, cursor: number | undefined): Promise<{ realEstates: PaginatedRealEstate[], cursor: number | undefined }> => {
  try {
    const { data } = await api.get<PaginatedRealEstate[]>('/real-estate', {
      params: {
        take,
        ...(cursor ? { cursor } : {})
      }
    })
  
    return {
      realEstates: data,
      cursor: data[data.length - 1]?.id || undefined
    }
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar a lista de imóveis.')
    throw error
  }
}