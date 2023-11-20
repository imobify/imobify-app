/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ImageBackground, View } from 'react-native'

import CustomTitle from '@components/custom-title'
import { AuthStackParamList } from '@routes/types'
import RedirectLink from '@components/redirect-link'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { styles } from './styles'
import SignupForm from './components/signup-form'

type Props = NativeStackScreenProps<AuthStackParamList, 'signup'>

const background = require('../../../../assets/signup-background.png')

const Signup: React.FC<Props> = ({ navigation }: Props) => (
  <ImageBackground source={background} resizeMode='cover' style={styles.container}>
    <View style={styles.formContainer}>
      <CustomTitle>Login</CustomTitle>
      <SignupForm />
      <RedirectLink
        firstText='Já possui uma conta?'
        secondText='Faça Login'
        onPress={() => navigation.navigate('signin')}
      />
    </View>
  </ImageBackground>
)

export default Signup
