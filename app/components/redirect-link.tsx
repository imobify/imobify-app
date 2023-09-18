import { Button, Text } from 'react-native-paper'

import { theme } from '../theme'
import { GestureResponderEvent, StyleSheet } from 'react-native'

type Props = {
  firstText: string
  secondText: string
  onPress: (e: GestureResponderEvent) => void
}

const RedirectLink = ({ firstText, secondText, onPress }: Props) => {
  return (
    <Button
      style={styles.button}
      mode='text'
      onPress={onPress}
    >
      <Text variant='titleMedium' style={{ color: theme.colors.surface }}>
        {firstText} {
          <Text variant='titleMedium' style={{ color: theme.colors.primary }}>
            {secondText}
          </Text>
        }
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16
  },
})

export default RedirectLink
