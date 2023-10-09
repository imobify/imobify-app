/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'

type CarouselItem = {
  photoPublicId: string
  photoUrl?: string
}

const { width } = Dimensions.get('screen')

const SPACING = 5
const ITEM_LENGTH = width * 0.9
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2
const BORDER_RADIUS = 20
const CURRENT_ITEM_TRANSLATE_Y = 48

type CarouselProps = {
  data: CarouselItem[]
}

const Carousel: React.FC<CarouselProps> = ({ data = [] }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const [dataWithPlaceholders, setDataWithPlaceholders] = useState<
    CarouselItem[]
  >([])

  useEffect(() => {
    setDataWithPlaceholders([{ photoPublicId: 'abc' }, ...data, { photoPublicId: data.length.toString() }])
  }, [data])

  if (!data.length) {
    return (
      <View style={{...styles.itemContent, marginVertical: CURRENT_ITEM_TRANSLATE_Y}}>
        <Image 
          source={require('../../assets/placeholder-no-image.png')}
          style={styles.itemImage}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={dataWithPlaceholders}
      renderItem={({item, index}) => {
        if (!item.photoUrl) {
          return <View style={{width: EMPTY_ITEM_LENGTH}} />
        }

        const inputRange = [
          (index - 2) * ITEM_LENGTH,
          (index - 1) * ITEM_LENGTH,
          index * ITEM_LENGTH,
        ]

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [
            CURRENT_ITEM_TRANSLATE_Y * 2,
            CURRENT_ITEM_TRANSLATE_Y,
            CURRENT_ITEM_TRANSLATE_Y * 2,
          ],
          extrapolate: 'clamp',
        })

        return (
          <View style={{width: ITEM_LENGTH}}>
            <Animated.View
              style={[
                {
                  transform: [{translateY}],
                },
                styles.itemContent,
              ]}>
              <Image source={{uri: item.photoUrl}} style={styles.itemImage} />
            </Animated.View>
          </View>
        )
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.photoPublicId}
      bounces={false}
      decelerationRate={0}
      renderToHardwareTextureAndroid
      contentContainerStyle={styles.flatListContent}
      snapToInterval={ITEM_LENGTH}
      snapToAlignment="start"
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: false},
      )}
      scrollEventThrottle={16}
    />
  )
}

export default Carousel

const styles = StyleSheet.create({
  flatListContent: {
    height: CURRENT_ITEM_TRANSLATE_Y * 2 + ITEM_LENGTH,
    alignItems: 'flex-start',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
})