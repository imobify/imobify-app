import * as yup from 'yup'

export const paginatedFavoriteSchema = yup.object({
  id: yup.number().required(),
  realEstate_id: yup.number().required(),
  realEstate: yup.object({
    id: yup.number().required(),
    title: yup.string().required(),
    address: yup.string().required(),
    photos: yup.array().of(yup.object({
      photoUrl: yup.string().url().required(),
    })).required()
  }).required()
})

export type PaginatedFavorite = yup.InferType<typeof paginatedFavoriteSchema>