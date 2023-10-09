import { theme } from '@theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userIcon: { 
    backgroundColor: theme.colors.onSurfaceDisabled 
  },
  editAvatarBtn: { 
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  title: {
    marginVertical: 24
  },
  card: { 
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderRadius: 12
  },
  info: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 64
  },
  editBtn: {
    marginTop: 16
  },
  signOutBtn: {
    marginVertical: 16
  }
})