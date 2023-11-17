import { theme } from '@theme'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'

type Props = {
  onClick: () => void
}

const EmptyCard: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <View
      style={styles.container}
    >
      <IconButton 
        mode='contained'
        containerColor={theme.colors.surfaceDisabled}
        icon='plus'
        iconColor='black'
        onPress={onClick}
        size={24}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceDisabled,
    borderRadius: 4
  }
})

export default EmptyCard
