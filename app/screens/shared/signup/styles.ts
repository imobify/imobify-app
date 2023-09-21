import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: theme.colors.secondary,
    overflow: 'hidden'
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 50,
  },
  formInput: {
    marginTop: 16
  },
  errorMessage: {
    color: 'red'
  }
})