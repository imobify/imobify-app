import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'

const LoadingScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}>
      <ActivityIndicator animating={true} />
    </View>
  )
}

export default LoadingScreen