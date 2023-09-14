import { Text, TouchableOpacity, View } from 'react-native'
import { logOut } from '../services/auth/auth.service'

const Home: React.FC = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home screen</Text>
    <TouchableOpacity
      onPress={() => logOut()}
    >
      <Text>logout</Text>
    </TouchableOpacity>
  </View>
)

export default Home
