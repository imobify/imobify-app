/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Image } from 'expo-image'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomTitle from '@components/custom-title'
import { AuthStackParamList } from '@routes/types'
import RedirectLink from '@components/redirect-link'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { styles } from './styles'
import SigninForm from './components/signin-form'
const townBackground = require('../../../../assets/town-background.png')

type Props = NativeStackScreenProps<AuthStackParamList, 'signin'>

const Signin: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainerStyle}>
        <Image 
          contentFit='contain'
          source={townBackground}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <CustomTitle>Login</CustomTitle>
        <SigninForm />
        <RedirectLink
          firstText='Não possui uma conta?'
          secondText='Cadastre-se'
          onPress={() => navigation.navigate('signup')}
        />
      </View>
    </SafeAreaView>
  )
}

export default Signin
