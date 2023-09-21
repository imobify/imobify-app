/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SafeAreaView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image } from 'expo-image'

import CustomTitle from '@components/custom-title'
import RedirectLink from '@components/redirect-link'
import { AuthStackParamList } from '@routes/auth.routes'

const townBackground = require('../../../../assets/town-background.png')
import { styles } from './styles'
import SigninForm from './components/signin-form'

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
