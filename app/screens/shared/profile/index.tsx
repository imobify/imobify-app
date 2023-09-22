import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { Button, Text } from 'react-native-paper'
import { useAuthActions, useUser } from '@stores/authStore'

const Profile: React.FC = () => {
  const { signOut } = useAuthActions()
  const { userType } = useUser()
  return (
    <SafeAreaView style={styles.container}>
      <Text>{userType?.toString()}</Text>
      <Button
        onPress={() => signOut()}
      >
        <Text>LOGOUT</Text>
      </Button>
    </SafeAreaView>
  )
}

export default Profile
