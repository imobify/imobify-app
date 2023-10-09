import * as yup from 'yup'

export const PaginatedRealEstateSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  isActive: yup.boolean().required(),
  photos: yup.array().of(yup.object({
    photoUrl: yup.string().url().required(),
  })).required(),
  _count: yup.object({
    leads: yup.number().required()
  }).required()
})

export type PaginatedRealEstate = yup.InferType<typeof PaginatedRealEstateSchema>