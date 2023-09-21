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
    primary: '#1E303A',
    secondaryContainer: '#569490',
    secondary: '#7dc1c1',
    tertiary: '#61a8a3',
  },
  ...fonts
}