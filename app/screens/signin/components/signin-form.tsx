import { View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { Formik } from 'formik'

import { signinFormSchema } from '../schemas/signin-form'
import { useAuthActions } from '../../../stores/authStore'

import { theme } from '../../../theme'
import { styles } from '../styles'

const SigninForm = () => {
  const { login } = useAuthActions()

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => login(values)}
        validationSchema={signinFormSchema}
      >
        {({ handleSubmit, handleChange, isSubmitting, errors, setFieldTouched, touched }) => (
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
              left={<TextInput.Icon icon='eye' color={theme.colors.primary} />}
              mode='flat'
              secureTextEntry
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
              disabled={isSubmitting}
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
