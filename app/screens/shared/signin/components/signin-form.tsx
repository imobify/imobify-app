import { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { Formik } from 'formik'

import { SigninFormType, signinFormSchema } from '../schemas/signin-form'
import { useAuthActions } from '@stores/authStore'

import { theme } from '@theme'
import { styles } from '../styles'

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuthActions()

  const handleLogin = (values: SigninFormType) => {
    login(values)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={signinFormSchema}
      >
        {({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
          <>
            <TextInput
              left={<TextInput.Icon icon='email' color={theme.colors.primary} />}
              mode='flat'
              keyboardType='email-address'
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email')}
              label='Email'
              placeholder='Digite seu email.'
            />
            {touched.email && errors.email ? (
              <Text style={styles.errorMessage}>
                {errors.email}
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
              <Text style={styles.errorMessage}>
                {errors.password}
              </Text>

            ) : null}
            <Button
              style={styles.formInput}
              mode='contained'
              onPress={() => handleSubmit()}
              buttonColor={theme.colors.primary}
            >
              <Text variant='titleMedium' style={{ color: theme.colors.surface }}>Entrar</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}

export default SigninForm
