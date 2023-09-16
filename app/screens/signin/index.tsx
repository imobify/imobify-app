/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SafeAreaView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image } from 'expo-image'

import { CustomText } from '../../components/CustomText'
import { AuthStackParamList } from '../../routes/auth.routes'

const townBackground = require('../../../assets/town-background.png')
import { styles } from './styles'
import SigninForm from './components/signin-form'

type Props = NativeStackScreenProps<AuthStackParamList, 'Signin'>

const Signin: React.FC<Props> = () => {
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
        <CustomText style={styles.loginTitle} variant='title'>Login</CustomText>
        <SigninForm />
      </View>
    </SafeAreaView>
  )
}

export default Signin
