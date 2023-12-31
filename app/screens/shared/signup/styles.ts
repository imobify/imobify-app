import { theme } from '@theme'
import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 50,
  },
  formInput: {
    marginTop: 16,
    backgroundColor: theme.colors.surface
  },
  errorMessage: {
    color: 'red'
  },
  formBtn: {
    marginTop: 16,
  },
})