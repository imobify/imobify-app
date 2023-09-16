import { Text, TouchableOpacity, View } from 'react-native'
import { useAuthActions } from '../../stores/authStore'

const Home: React.FC = () => {
  const { signOut } = useAuthActions()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home screen</Text>
      <TouchableOpacity
        onPress={() => signOut()}
      >
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
