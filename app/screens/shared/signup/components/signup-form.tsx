import { useState } from 'react'

import { theme } from '@theme'
import { Formik } from 'formik'
import { ScrollView } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

import { styles } from '../styles'
import { signupFormSchema, SignupFormType } from '../schemas/signup-form'
import { editUserSchema } from '../schemas/edit-user'

type SignupFormProps = {
  initialValues: SignupFormType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormSubmit: (data: SignupFormType) => Promise<any> | void
  submitButtonText: string
  mode: 'signup' | 'edit'
}

const SignupForm: React.FC<SignupFormProps> = ({ mode, initialValues, onFormSubmit, submitButtonText }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
   
  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={mode === 'signup' ? signupFormSchema : editUserSchema}
      >
        {({ handleChange, handleSubmit, setFieldTouched, errors, touched, values }) => (
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
              value={values.document}
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
              value={values.name}
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
              value={values.email}
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
              value={values.phone}
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
              value={values.password}
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
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text
                style={styles.errorMessage}
              >
                {errors.confirmPassword}
              </Text>

            ) : null}
            <Button
              style={styles.formBtn}
              mode='contained'
              onPress={() => handleSubmit()}
              buttonColor={theme.colors.primary}
            >
              <Text variant='titleMedium' style={{ color: theme.colors.surface }}>
                {submitButtonText}
              </Text>
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default SignupForm
