/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider, Snackbar } from 'react-native-paper'

import { StatusBar } from 'expo-status-bar'
import { theme } from '@theme'
import Navigation from '@routes/index'
import useCachedResources from '@hooks/useCachedResources'
import { useToastStore } from '@stores/toastStore'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const { visible, message, hide } = useToastStore()
  const isLoadingComplete = useCachedResources()


  if (!isLoadingComplete) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar translucent />
          <Navigation />
          {
            visible && (
              <Snackbar 
                visible
                onDismiss={hide}
                action={{
                  label: 'Ok'
                }}
              >
                {message}
              </Snackbar>
            )
          }
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
