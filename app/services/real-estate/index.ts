import { LocationObject } from 'expo-location'
import Geocoder from 'react-native-geocoding'

import { makeAddress } from '@utils/makeAddress'
import { useToastStore } from '@stores/toastStore'
import { GetNearResponse, RealEstate } from '@models/realEstate'
import { PaginatedRealEstate } from '@models/realEstate/PaginatedRealEstate'

import api from '../client'
import { AddForm } from '@screens/announcer/real-estate-form/schemas/add-form'
import { AddEditForm } from '@screens/announcer/real-estate-form/schemas/add-edit-form'

const googleGeocodingApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? ''

Geocoder.init(googleGeocodingApiKey)

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

export const createRealEstate = async (data: AddForm): Promise<RealEstate | undefined> => {
  try {
    const { 
      title, 
      description, 
      area = 0, 
      cep, 
      city, 
      street, 
      neighborhood, 
      uf, 
      selling_value, 
      tax_value, 
      renting_value, 
      number, 
      photos,
      isActive
    } = data
  
    const address = makeAddress({ cep, city, neighborhood, number, street, uf })
  
    const geocodingResponse = await Geocoder.from(address)
  
    const { lat, lng } = geocodingResponse.results[0].geometry.location
  
    if (!lat && !lng) {
      throw new Error('Latitude e longitude não encontrados para esse endereço.')
    }
    
    const images = photos.map(photo => {
      return {
        uri: photo.uri,
        name: photo.id,
        type: 'image/jpeg'
      }
    })
    
    const form = {
      title,
      description,
      area: area.toString(),
      latitude: lat.toString(),
      longitude: lng.toString(),
      address,
      isActive: JSON.stringify(isActive),
      'images[]': images
    }

    if (selling_value) form.selling_value = selling_value.toString()
    if (renting_value) form.renting_value = renting_value.toString()
    if (tax_value) form.tax_value = tax_value.toString()
    
    const response = await api.postForm<RealEstate>('/real-estate', form)

    return response.data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível cadastrar o imóvel.')
  }
}

export const editRealEstate = async (data: AddEditForm & { id: number }): Promise<RealEstate | undefined> => {
  try {
    const {
      id,
      title, 
      description, 
      area = 0, 
      cep, 
      city, 
      street, 
      neighborhood, 
      uf, 
      selling_value, 
      tax_value, 
      renting_value, 
      number, 
      photos,
      deletedPhotos,
      isActive
    } = data

    // no need to upload already uploaded photos
    const newPhotos = photos?.filter(photo => photo.isNew) || []

    const address = makeAddress({ cep, city, neighborhood, number: number.toString(), street, uf })

    const geocodingResponse = await Geocoder.from(address)
  
    const { lat, lng } = geocodingResponse.results[0].geometry.location
  
    if (!lat && !lng) {
      throw new Error('Latitude e longitude não encontrados para esse endereço.')
    }
    
    const images = newPhotos.map(photo => {
      return {
        uri: photo.uri,
        name: photo.id,
        type: 'image/jpeg'
      }
    })

    const form = {
      title,
      description,
      area: area.toString(),
      latitude: lat.toString(),
      longitude: lng.toString(),
      address,
      isActive: JSON.stringify(isActive),
      'images[]': images,
      deletedPhotos,
    }

    if (selling_value) form.selling_value = selling_value.toString()
    if (renting_value) form.renting_value = renting_value.toString()
    if (tax_value) form.tax_value = tax_value.toString()

    const response = await api.patchForm<RealEstate>(`real-estate/${id}`, form)

    return response.data
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível editar o imóvel.')
  }
}

export const editStatusRealEstate = async (data: {status: boolean, id: number}): Promise<RealEstate | undefined> => {
  const form = {
    isActive: JSON.stringify(data.status)
  }

  const response = await api.patchForm<RealEstate>(`real-estate/${data.id}`, form)

  return response.data
}