import * as yup from 'yup'

const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

export const addFormSchema = yup.object({
  title: yup.string().required('O título do imóvel é obrigatório!'),
  description: yup.string().required('É necessária uma descrição para o imóvel!'),
  cep: yup.string().matches(/\d{5}-\d{3}/, 'Digite o CEP no formato XXXXX-XXX.').required('O CEP do imóvel é obrigatório!'),
  street: yup.string().required('É obrigatório informar a rua/logradouro do imóvel!'),
  number: yup.string().required('É obrigatório informar o número do imóvel!'),
  neighborhood: yup.string().required('É obrigatório informar o bairro do imóvel!'),
  city: yup.string().required('É obrigatório informar a cidade do imóvel!'),
  uf: yup.string().oneOf(states, 'Estado inválido. Digite a sigla de 2 caracteres do estado.').required('É obrigatório informar o estado do imóvel!'),
  area: yup.string().required('É obrigatório informar a área do imóvel, em m².'),
  renting_value: yup.string().optional(),
  selling_value: yup.string().optional(),
  tax_value: yup.string().optional(),
  photos: yup.array().of(
    yup.object({
      uri: yup.string().required(),
      id: yup.string().required(),
      isNew: yup.boolean().required()
    }).required('Arquivo inválido!')
  ).required(),
  deletedPhotos: yup.array().of(
    yup.string()
  ).optional()
})
 
export type AddForm = yup.InferType<typeof addFormSchema>