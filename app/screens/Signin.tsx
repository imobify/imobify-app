import { useState } from 'react'
import {
  Text, TextInput, TouchableOpacity, View,
} from 'react-native'
import { useAuthActions} from '../stores/authStore'

const Signin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuthActions()

  return (
    <View>
      <Text>signin</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity
        onPress={() => login({ email, password })}
      >
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signin
