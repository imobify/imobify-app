import * as yup from 'yup'

export const GetNearResponseSchema = yup.array().of(yup.object({
  id: yup.number().required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  distance: yup.number().required()
}))

export type GetNearResponse = yup.InferType<typeof GetNearResponseSchema>