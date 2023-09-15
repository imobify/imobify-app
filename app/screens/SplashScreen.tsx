import { Text, View } from 'react-native'

const SplashScreen: React.FC = () => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32 }}>LOADING...</Text>
    </View>
  )
}

export default SplashScreen