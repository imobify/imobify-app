import { theme } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  owner: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
    alignItems: 'center'
  },
  divider: {
    marginVertical: 8
  },
  sectionTitle: {
    fontWeight: 'bold'
  },
  ownerIcon: {
    backgroundColor: theme.colors.onSurfaceDisabled 
  },
  address: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'space-between'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    flex: 1,
    marginVertical: 32,
    gap: 8,
    alignItems: 'center'
  },
  primaryBtn: {
    width: '60%'
  },
  primaryBtnText: { 
    color: theme.colors.surface 
  },
  dangerBtn: { 
    color: 'red'
  },
})