export const parseAddress = (addressString: string) => {
  const [street, number, neighborhood, cep, cityUf] = addressString.split(',').map(str => str.trim())

  const [city, uf] = cityUf.split('-').map(str => str.trim())

  return {
    street, 
    number, 
    neighborhood, 
    cep, 
    city, 
    uf
  }
}