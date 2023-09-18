import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  buttonGroup: {
    marginTop: 24,
    gap: 4,
  },
  button: {
    width: '100%',
    textAlign: 'center'
  },
  loginBtn: {
    color: theme.colors.tertiary
  },
  signupBtn: {
    color: theme.colors.surface
  }
})