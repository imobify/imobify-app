import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { AuthStackParamList } from '../../../routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { Formik } from 'formik'
import { SignupFormType, signupFormSchema } from '../schemas/signup-form'
import { Button, Text, TextInput } from 'react-native-paper'
import { theme } from '../../../theme'
import { styles } from '../styles'

type NavigationType = NativeStackScreenProps<AuthStackParamList, 'signin'>

const SignupForm = () => {
  const { navigation } = useNavigation<NavigationType>()

  const handleInitialSubmit = (data: SignupFormType) => {
    console.log(data)
    navigation.navigate('pick-type', data)
  }
  
  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          document: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={(values) => handleInitialSubmit(values)}
        validationSchema={signupFormSchema}
      >
        {({ handleChange, handleSubmit, isSubmitting, setFieldTouched, errors, touched }) => (
          <>
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='card-account-details-outline' color={theme.colors.primary} />}
              mode='flat'
              keyboardType='number-pad'
              onChangeText={handleChange('document')}
              onFocus={() => setFieldTouched('document')}
              label='CPF/CNPJ'
              placeholder='Digite seu CPF/CNPJ.'
            />
            {touched.document && errors.document ? (
              <Text>
                {errors.document}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='account' color={theme.colors.primary} />}
              mode='flat'
              onChangeText={handleChange('name')}
              onFocus={() => setFieldTouched('name')}
              label='Nome'
              placeholder='Digite seu nome.'
            />
            {touched.name && errors.name ? (
              <Text>
                {errors.name}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='email' color={theme.colors.primary} />}
              mode='flat'
              keyboardType='email-address'
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email')}
              label='Email'
              placeholder='Digite seu email.'
            />
            {touched.email && errors.email ? (
              <Text>
                {errors.email}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='phone' color={theme.colors.primary} />}
              mode='flat'
              keyboardType='name-phone-pad'
              onChangeText={handleChange('phone')}
              onFocus={() => setFieldTouched('phone')}
              label='Telefone'
              placeholder='Digite seu telefone ou celular.'
            />
            {touched.phone && errors.phone ? (
              <Text>
                {errors.phone}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='eye' color={theme.colors.primary} />}
              mode='flat'
              secureTextEntry
              onChangeText={handleChange('password')}
              onFocus={() => setFieldTouched('password')}
              label='Senha'
              placeholder='Digite sua senha.'
            />
            {touched.password && errors.password ? (
              <Text>
                {errors.password}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon icon='eye' color={theme.colors.primary} />}
              mode='flat'
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onFocus={() => setFieldTouched('confirmPassword')}
              label='Confirme a senha'
              placeholder='Confirme a senha.'
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text>
                {errors.confirmPassword}
              </Text>

            ) : null}
            <Button
              style={styles.formInput}
              loading={isSubmitting}
              mode='contained'
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              buttonColor={theme.colors.primary}
            >
              <Text variant='titleMedium' style={{ color: theme.colors.surface }}>Cadastrar-se</Text>
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default SignupForm
