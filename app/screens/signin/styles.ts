import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../theme'

const screen = Dimensions.get('screen')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary
  },
  imageContainerStyle: {
    height : '53%',
    width : '100%',
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 200,
    borderBottomEndRadius : 200,
    overflow : 'hidden',
  },
  image: {
    height: screen.height / 1.5,
    transform : [ { scaleX : 0.5 } ],
    backgroundColor : theme.colors.tertiary,
    alignItems : 'center',
    justifyContent : 'center'
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 50,
  },
  loginTitle: {
    color: theme.colors.primary,
    marginBottom: 24
  },
  formInput: {
    marginTop: 16
  },
  errorMessage: {
    color: 'red'
  }
})