import {
  MD3LightTheme as DefaultTheme,
  MD3Theme,
  configureFonts
} from 'react-native-paper'

const customTitle = {
  'title': {
    'fontFamily': 'Baloo',
    'fontSize': 32,
    'fontWeight': '400',
    'letterSpacing': 0,
    'lineHeight': 40,
  }
} as const

const fonts = configureFonts({
  config: {
    ...customTitle
  }
})

export const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2B6267',
    secondary: '#52A593',
    tertiary: '#1E303A',
  },
  ...fonts
}