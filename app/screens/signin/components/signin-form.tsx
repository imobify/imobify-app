import { View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { theme } from '../../../theme'
import { styles } from '../styles'
import { useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '../../../routes/auth.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import { signinFormSchema } from '../schemas/signin-form'
import { useAuthActions } from '../../../stores/authStore'

type NavigationType = NativeStackScreenProps<AuthStackParamList, 'Signin'>

const SigninForm = () => {
  const { navigation } = useNavigation<NavigationType>()
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
            >
              <Text variant='titleMedium' style={{ color: theme.colors.surface }}>Entrar</Text>
            </Button>
            <Button
              style={styles.formInput}
              mode='text'
              disabled={isSubmitting}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text variant='titleMedium' style={{ color: theme.colors.surface }}>
                    Não possui uma conta? {
                  <Text variant='titleMedium' style={{ color: theme.colors.tertiary }}>
                        Cadastre-se
                  </Text>
                }
              </Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  )
}

export default SigninForm
