// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import {
  SafeAreaProvider
} from 'react-native-safe-area-context'
import Navigation from './app/routes'
import { PaperProvider } from 'react-native-paper'

// const App: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App
