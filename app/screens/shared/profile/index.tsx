import { SafeAreaView } from 'react-native'
import { styles } from './styles'
import { Button, Text } from 'react-native-paper'
import { useAuthActions } from '@stores/authStore'

const Profile: React.FC = () => {
  const { signOut } = useAuthActions()
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => signOut()}
      >
        <Text>LOGOUT</Text>
      </Button>
    </SafeAreaView>
  )
}

export default Profile
