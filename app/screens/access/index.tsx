import { View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text } from 'react-native-paper'

import Background from '../../components/Background'
import LogoWithTitle from '../../components/LogoWithTitle'
import { AuthStackParamList } from '../../routes/auth.routes'

import { styles } from './styles'
import { theme } from '../../theme'

type Props = NativeStackScreenProps<AuthStackParamList, 'SigninOrRegister'>

const Access: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <Background>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LogoWithTitle />
        <View style={styles.buttonGroup}>
          <Button
            onPress={() => navigation.navigate('Signin')} 
            contentStyle={styles.button} 
            mode='contained' 
            buttonColor={theme.colors.surface} 
            textColor={theme.colors.primary}
          >
            <Text 
              variant='titleMedium' 
              style={styles.loginBtn}
            >
              Login
            </Text>
          </Button>
          <Button 
            onPress={() => navigation.navigate('Signup')} 
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
    </Background>
  )
}

export default Access
