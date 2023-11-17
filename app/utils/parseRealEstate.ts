import { RealEstate } from '@models/realEstate'
import { parseAddress } from './parseAddress'

export type ParsedRealEstate = {
  title: string
  description: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  uf: string
  area: number
  renting_value: number | undefined
  selling_value: number | undefined
  tax_value: number | undefined
  photos: {
    uri: string
    id: string
    isNew: boolean
  }[],
  deletedPhotos: string[]
}

export const parseRealEstate = (realEstate: RealEstate): ParsedRealEstate => {
  const validPhotos = realEstate.photos.filter(photo => {
    if (photo.photoPublicId && photo.photoUrl) {
      return true
    } else return false
  })

  const photosWithURIs = validPhotos.map(photo => {
    return {
      uri: photo.photoUrl,
      id: photo.photoPublicId,
      isNew: false
    }
  })

  const parsedRealEstate = {
    title: realEstate.title,
    description: realEstate.description,
    area: realEstate.area,
    renting_value: realEstate.renting_value ?? undefined,
    selling_value: realEstate.selling_value ?? undefined,
    tax_value: realEstate.tax_value ?? undefined,
    photos: photosWithURIs,
    deletedPhotos: []
  }

  if (realEstate.address) {
    return {
      ...parsedRealEstate,
      ...parseAddress(realEstate.address)
    }
  } else {
    return {
      ...parsedRealEstate,
      street: '',
      number: '',
      neighborhood: '',
      cep: '',
      city: '',
      uf: '',
    }
  }
}