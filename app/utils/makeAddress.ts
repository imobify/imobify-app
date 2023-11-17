type Address = {
  street: string
  number: string
  neighborhood: string
  cep: string
  city: string 
  uf: string
}

export const makeAddress = (addressObject: Address): string => {
  const {
    street, 
    number, 
    neighborhood, 
    cep, 
    city, 
    uf
  } = addressObject

  const addressString = `${street}, ${number}, ${neighborhood}, ${cep}, ${city} - ${uf}`

  return addressString
}