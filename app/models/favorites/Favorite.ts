import * as yup from 'yup'

export const favoriteSchema = yup.object({
  id: yup.number().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
  author_id: yup.string().uuid().required(),
  realEstate_id: yup.number().required()
})

export type Favorite = yup.InferType<typeof favoriteSchema>