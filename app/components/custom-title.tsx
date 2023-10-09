import { customText } from 'react-native-paper'
import { StyleSheet, TextStyle } from 'react-native'
import { theme } from '@theme'

const CustomText = customText<'title'>()

type Props = { children: React.ReactNode, style?: TextStyle }

const CustomTitle: React.FC<Props> = ({ children, style }: Props) => (
  <CustomText style={{...style, ...styles.title}} variant='title'>
    {children}
  </CustomText>
)

const styles = StyleSheet.create({
  title: {
    color: theme.colors.primary
  }
})

export default CustomTitle