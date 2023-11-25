import * as yup from 'yup'

export const searchRealEstateSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  photoUrl: yup.string().url().required()
})

export type SearchRealEstate = yup.InferType<typeof searchRealEstateSchema>