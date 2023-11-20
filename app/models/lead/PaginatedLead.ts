import * as yup from 'yup'

export const paginatedLeadSchema = yup.object({
  id: yup.number().required(),
  createdAt: yup.string().required(),
  updatedAt: yup.string().required(),
  author_id: yup.string().uuid().required(),
  realEstate_id: yup.number().required(),
  realEstate: yup.object({
    id: yup.number().required(),
    title: yup.string().required(),
    photos: yup.array().of(yup.object({
      photoUrl: yup.string().url().required(),
    })).required()
  }).optional(),
  author: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    avatar_url: yup.string().url().required(),
  }).optional()
})

export type PaginatedLead = yup.InferType<typeof paginatedLeadSchema>