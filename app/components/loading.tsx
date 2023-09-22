import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator 
        size='large'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading
