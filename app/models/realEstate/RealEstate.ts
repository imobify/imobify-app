import * as yup from 'yup'

export const RealEstateSchema = yup.object({
  id: yup.number().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  area: yup.number().required(),
  selling_value: yup.number().nullable(),
  renting_value: yup.number().nullable(),
  tax_value: yup.number().nullable(),
  isActive: yup.boolean().required(),
  owner_id: yup.string().uuid().required(),
  photos: yup.array().of(
    yup.object({
      photoUrl: yup.string().url().required(),
      photoPublicId: yup.string().required()
    }).required()
  ).required(),
  owner: yup.object({
    name: yup.string().required(),
    avatar_url: yup.string().url().required()
  }).required(),
  leads: yup.array().of(yup.object({
    id: yup.number().required(),
    author_id: yup.string().uuid().required()
  })).required(),
  favorites: yup.array().of(yup.object({
    id: yup.number().required(),
    author_id: yup.string().uuid().required()
  })).required(),
  coordinates: yup.object({
    longitude: yup.number().required(),
    latitude: yup.number().required()
  }).required()
})

export type RealEstate = yup.InferType<typeof RealEstateSchema>