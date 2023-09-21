import { customText } from 'react-native-paper'
import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { theme } from '@theme'

const CustomText = customText<'title'>()

type Props = PropsWithChildren

const CustomTitle: React.FC<Props> = ({ children }: Props) => (
  <CustomText style={styles.title} variant='title'>
    {children}
  </CustomText>
)

const styles = StyleSheet.create({
  title: {
    color: theme.colors.primary
  }
})

export default CustomTitle