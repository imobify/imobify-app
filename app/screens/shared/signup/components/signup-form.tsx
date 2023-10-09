import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { Button, Text, TextInput } from 'react-native-paper'
import { AuthStackParamList } from '@routes/auth.routes'
import { SignupFormType, signupFormSchema } from '../schemas/signup-form'
import { theme } from '@theme'
import { styles } from '../styles'

type NavigationType = NativeStackNavigationProp<AuthStackParamList, 'signup'>

const SignupForm = () => {
  const navigation = useNavigation<NavigationType>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInitialSubmit = (data: SignupFormType) => {
    navigation.navigate('userType', data)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
              <Text
                style={styles.errorMessage}
              >
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
              <Text
                style={styles.errorMessage}
              >
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
              <Text
                style={styles.errorMessage}
              >
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
              <Text
                style={styles.errorMessage}
              >
                {errors.phone}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon onPress={toggleShowPassword} icon='eye' color={theme.colors.primary} />}
              mode='flat'
              secureTextEntry={!showPassword}
              onChangeText={handleChange('password')}
              onFocus={() => setFieldTouched('password')}
              label='Senha'
              placeholder='Digite sua senha.'
            />
            {touched.password && errors.password ? (
              <Text
                style={styles.errorMessage}
              >
                {errors.password}
              </Text>

            ) : null}
            <TextInput
              style={styles.formInput}
              left={<TextInput.Icon onPress={toggleShowConfirmPassword} icon='eye' color={theme.colors.primary} />}
              mode='flat'
              secureTextEntry={!showConfirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onFocus={() => setFieldTouched('confirmPassword')}
              label='Confirme a senha'
              placeholder='Confirme a senha.'
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text
                style={styles.errorMessage}
              >
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
