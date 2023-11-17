import { theme } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  linkCard: {
    flexDirection: 'column',
    display: 'flex',
    gap: 16,
    marginVertical: 16
  },
  linkToImages: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  checkBoxContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formInput: {
    marginTop: 16
  },
  primaryBtn: {
    marginTop: 32,
    marginBottom: 64,
    width: '60%',
    alignSelf: 'center'
  },
  primaryBtnText: {
    color: theme.colors.surface
  }
})