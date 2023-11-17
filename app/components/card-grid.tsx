import { StyleSheet, View } from 'react-native'

import EmptyCard from './empty-card'
import PictureCard from './picture-card'

type Props = {
  photos: {
    uri: string
    id: string
    isNew: boolean
  }[]
  onDelete: (id: string, isNew: boolean) => void
  onClickEmptyCard: () => void
}

const CardGrid: React.FC<Props> = ({ photos, onDelete, onClickEmptyCard }: Props) => {
  return (
    <View style={styles.container}>
      {photos.map(photo => {
        return (
          <PictureCard 
            key={photo.id}
            photo={photo}
            onDelete={onDelete}
          />
        )})}
      {photos.length < 9 ? (
        <EmptyCard 
          onClick={onClickEmptyCard}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flex: 1, 
    width: '100%', 
    gap: 16, 
    flexWrap: 'wrap'
  }
})

export default CardGrid
