import { theme } from '@theme'
import { IconButton } from 'react-native-paper'
import { Image, StyleSheet, View } from 'react-native'

type Props = {
  photo: {
    uri: string
    id: string
    isNew: boolean
  }
  onDelete: (id: string, isNew: boolean) => void
}

const PictureCard: React.FC<Props> = ({ photo, onDelete }: Props) => {
  return (
    <View
      style={styles.container}
    >
      <Image 
        source={{ uri: photo.uri }}
        width={100}
        height={150}
        resizeMode='cover'
        style={styles.image}
      />
      <IconButton 
        mode='contained'
        containerColor={theme.colors.error}
        icon='close-thick'
        iconColor={theme.colors.surface}
        onPress={() => onDelete(photo.id, photo.isNew)}
        size={24}
        style={styles.deleteBtn}
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
  },
  image: {
    borderRadius: 4,
    borderColor: theme.colors.secondary,
    borderWidth: 2
  },
  deleteBtn: { 
    position: 'absolute',
    bottom: -16,
    right: -16
  }
})

export default PictureCard
