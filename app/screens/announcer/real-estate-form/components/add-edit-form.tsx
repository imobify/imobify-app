import { useState } from 'react'

import { Formik } from 'formik'
import { View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, Checkbox, Text, TextInput } from 'react-native-paper'

import CardGrid from '@components/card-grid'
import CustomTitle from '@components/custom-title'
import { generateRandomString } from '@utils/randomString'
import { RealEstateTabNavigatorParams } from '@routes/types'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { styles } from '../styles'
import { addEditFormSchema } from '../schemas/add-edit-form'

type NavigationType = NativeStackNavigationProp<RealEstateTabNavigatorParams, 'realEstateForm'>

type Photo = {
  uri: string
  id: string
  isNew: boolean
}

type RealEstateForm = {
  title: string
  description: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  uf: string
  area: number | undefined
  renting_value: number | undefined
  selling_value: number | undefined
  tax_value: number | undefined
  photos: Photo[]
  deletedPhotos: string[]
}

type Props = {
  id: number | undefined
  data: RealEstateForm
}

const AddEditForm: React.FC<Props> = ({ id, data }: Props) => {
  const navigation = useNavigation<NavigationType>()
  const [initialValues, setInitialValues] = useState<RealEstateForm>({ ...data, deletedPhotos: [] })
  const [isRent, setIsRent] = useState(!!data.renting_value)
  const [isSale, setIsSale] = useState(!!data.selling_value)
  const [hasTax, setHasTax] = useState(!!data.tax_value)

  const handleFormSubmit = async (data: RealEstateForm) => {
    console.log('id do imovel: ', id)
    const parsedData = await addEditFormSchema.validate(data)
    console.log('editing with data: ', parsedData)
    navigation.dispatch(
      StackActions.popToTop()
    )
  }

  return (
    <View>
      <Formik
        initialValues={{
          ...initialValues
        }}
        validationSchema={addEditFormSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, handleChange, setFieldTouched, values, errors, touched, setFieldValue }) => {
          const onPressDeletePhoto = (id: string, isNew: boolean) => {
            const filteredPhotos = initialValues.photos.filter(photo => !(photo.id === id))

            // only add to deletedPhotos pictures with existing IDs
            if (isNew) {
              setFieldValue('photos', filteredPhotos, true)
              setInitialValues(state => ({
                ...state,
                photos: filteredPhotos
              }))
            } else {
              const newState = {
                ...initialValues,
                photos: filteredPhotos,
                deletedPhotos: [...initialValues.deletedPhotos, id]
              }
              setFieldValue('photos', filteredPhotos, true)
              setFieldValue('deletedPhotos', newState.deletedPhotos)
            }
          }

          const onPressAddPhoto = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            if (status !== 'granted') {
              alert('É necessário conceder permissão de acesso à galeria!')
              return
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsMultipleSelection: true,
              selectionLimit: 9 - initialValues.photos.length,
              quality: 1
            })

            if (!result.canceled) {
              const parsedPhotos = result.assets.map(photo => ({ uri: photo.uri, id: generateRandomString(32), isNew: true }))
              const addedPhotos = [...initialValues.photos, ...parsedPhotos]

              setFieldValue('photos', addedPhotos, true)
              setInitialValues(state => {
                return {
                  ...state,
                  photos: addedPhotos
                }
              })
            }
          }

          return (
            <>
              <CustomTitle
                style={{ fontSize: 20 }}
              >
                Fotos
              </CustomTitle>
              <CardGrid 
                onClickEmptyCard={onPressAddPhoto}
                photos={initialValues.photos}
                onDelete={onPressDeletePhoto}
              />
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.title}
                onChangeText={handleChange('title')}
                onFocus={() => setFieldTouched('title')}
                label='Título'
                placeholder='Título do imóvel.'
              />
              {touched.title && errors.title ? (
                <Text
                >
                  {errors.title}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                onFocus={() => setFieldTouched('description')}
                label='Descrição'
                placeholder='Descrição do imóvel.'
              />
              {touched.description && errors.description ? (
                <Text
                >
                  {errors.description}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.area?.toString()}
                onChangeText={handleChange('area')}
                onFocus={() => setFieldTouched('area')}
                label='Área'
                placeholder='Área do imóvel. (m²)'
                inputMode='decimal'
              />
              {touched.description && errors.description ? (
                <Text
                >
                  {errors.description}
                </Text>

              ) : null}
              <View style={styles.formInput}>
                <CustomTitle style={{ fontSize: 18 }}>Disponível para:</CustomTitle>
                <View style={styles.checkBoxContainer}>
                  <View>
                    <Text>Venda</Text>
                    <Checkbox
                      status={isSale ? 'checked' : 'unchecked'}
                      onPress={() => setIsSale(!isSale)}
                    />
                  </View>
                  <View>
                    <Text>Aluguel</Text>
                    <Checkbox
                      status={isRent ? 'checked' : 'unchecked'}
                      onPress={() => setIsRent(!isRent)}
                    />
                  </View>
                </View>
              </View>
              {isSale ? (<TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.selling_value?.toString()}
                onChangeText={handleChange('selling_value')}
                onFocus={() => setFieldTouched('selling_value')}
                label='Valor de venda'
                placeholder='Valor para venda.'
                inputMode='decimal'
              />) : null}
              {touched.selling_value && errors.selling_value ? (
                <Text
                >
                  {errors.selling_value}
                </Text>

              ) : null}
              {isRent ? (<TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.renting_value?.toString()}
                onChangeText={handleChange('renting_value')}
                onFocus={() => setFieldTouched('renting_value')}
                label='Valor de locação'
                placeholder='Valor para locação.'
                inputMode='decimal'
              />) : null}
              {touched.renting_value && errors.renting_value ? (
                <Text
                >
                  {errors.renting_value}
                </Text>

              ) : null}
              <View style={{...styles.formInput, ...styles.checkBoxContainer, justifyContent: 'flex-start'}}>
                <CustomTitle style={{ fontSize: 18 }}>Incluir IPTU?</CustomTitle>
                <Checkbox
                  status={hasTax ? 'checked' : 'unchecked'}
                  onPress={() => setHasTax(!hasTax)}
                />
              </View>
              {hasTax ? (<TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.tax_value?.toString()}
                onChangeText={handleChange('tax_value')}
                onFocus={() => setFieldTouched('tax_value')}
                label='Valor do IPTU'
                placeholder='Digite o valor do IPTU.'
                inputMode='decimal'
              />) : null}
              {touched.tax_value && errors.tax_value ? (
                <Text
                >
                  {errors.tax_value}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.cep}
                onChangeText={handleChange('cep')}
                onFocus={() => setFieldTouched('cep')}
                label='CEP'
                placeholder='Digite o CEP do imóvel.'
                textContentType='postalCode'
              />
              {touched.cep && errors.cep ? (
                <Text
                >
                  {errors.cep}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.street}
                onChangeText={handleChange('street')}
                onFocus={() => setFieldTouched('street')}
                label='Rua ou Logradouro'
                placeholder='Digite o logradouro do imóvel.'
                textContentType='streetAddressLine1'
              />
              {touched.street && errors.street ? (
                <Text
                >
                  {errors.street}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.number}
                onChangeText={handleChange('number')}
                onFocus={() => setFieldTouched('number')}
                label='Número'
                placeholder='Digite o número do imóvel.'
                inputMode='numeric'
                textContentType='sublocality'
              />
              {touched.number && errors.number ? (
                <Text
                >
                  {errors.number}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.neighborhood}
                onChangeText={handleChange('neighborhood')}
                onFocus={() => setFieldTouched('neighborhood')}
                label='Bairro'
                placeholder='Digite o bairro do imóvel.'
                textContentType='streetAddressLine2'
              />
              {touched.neighborhood && errors.neighborhood ? (
                <Text
                >
                  {errors.neighborhood}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.city}
                onChangeText={handleChange('city')}
                onFocus={() => setFieldTouched('city')}
                label='Cidade'
                placeholder='Digite a cidade.'
                textContentType='addressCity'
              />
              {touched.city && errors.city ? (
                <Text
                >
                  {errors.city}
                </Text>

              ) : null}
              <TextInput 
                style={styles.formInput}
                mode='outlined'
                value={values.uf}
                onChangeText={handleChange('uf')}
                onFocus={() => setFieldTouched('uf')}
                label='UF'
                placeholder='Digite o estado, como sigla (UF).'
                textContentType='addressState'
              />
              {touched.uf && errors.uf ? (
                <Text
                >
                  {errors.uf}
                </Text>

              ) : null}
              <Button
                onPress={() => handleSubmit()}
                mode='contained'
                icon='check'
                style={styles.primaryBtn}
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Salvar</Text>
              </Button>
            </>
          )
        }}
      </Formik>
    </View>
  )
}

export default AddEditForm
