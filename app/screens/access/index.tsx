/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ImageBackground, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text } from 'react-native-paper'
import LogoWithTitle from '../../components/logo-with-title'
import { AuthStackParamList } from '../../routes/auth.routes'

import { styles } from './styles'
import { theme } from '../../theme'

type Props = NativeStackScreenProps<AuthStackParamList, 'access'>

const background = require('../../../assets/access-background.png')

const Access: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <ImageBackground source={background} resizeMode='cover' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LogoWithTitle />
        <View style={styles.buttonGroup}>
          <Button
            onPress={() => navigation.navigate('signin')} 
            contentStyle={styles.button} 
            mode='contained' 
            buttonColor={theme.colors.surface} 
            textColor={theme.colors.tertiary}
          >
            <Text 
              variant='titleMedium' 
              style={styles.loginBtn}
            >
              Login
            </Text>
          </Button>
          <Button 
            onPress={() => navigation.navigate('signup')} 
            contentStyle={styles.button} 
            mode='text'
          >
            <Text 
              variant='titleMedium' 
              style={styles.signupBtn}
            >
              Cadastrar-se
            </Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Access
