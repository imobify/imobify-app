
import { Image, ImageURISource, StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

type Props = {
  imageSource: ImageURISource
  header: string
  description: string
  handlePress: () => void
}

const PickTypeCard: React.FC<Props> = ({ imageSource, header, description, handlePress }: Props) => {
  return (
    <Card 
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text variant='titleMedium'>{header}</Text>
          <Text>{description}</Text>
        </View>
        <Image source={imageSource} resizeMode='contain' style={styles.image} />
      </View>
    </Card>
  )
}

export const styles = StyleSheet.create({
  card: {
    maxWidth: '96%',
    maxHeight: 120,
    paddingHorizontal: 16
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8
  },
  cardText: {
    gap: 8
  },
  image: {
    maxWidth: '33%'
  }
})

export default PickTypeCard
