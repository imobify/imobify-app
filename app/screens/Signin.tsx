import { useState } from 'react'
import {
  Text, TextInput, TouchableOpacity, View,
} from 'react-native'
import { Login } from '../services/auth/auth.service'

const Signin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email: string, password: string) => {
    await Login({ email, password })
  }

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
        onPress={() => handleLogin(email, password)}
      >
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signin
