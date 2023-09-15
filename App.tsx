import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './app/routes'
import { PaperProvider } from 'react-native-paper'

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export default App
