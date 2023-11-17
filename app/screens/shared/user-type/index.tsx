/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Text } from 'react-native-paper'
import { ImageBackground, View } from 'react-native'

import CustomTitle from '@components/custom-title'
import { useAuthActions } from '@stores/authStore'
import { AuthStackParamList } from '@routes/types'
import PickTypeCard from '@components/pick-type-card'
import { type RouteProp, useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { styles } from './styles'

const background = require('../../../../assets/user-type-background.png')
const announcerImage = require('../../../../assets/announce.png')
const searchImage = require('../../../../assets/search.png')

type Props = NativeStackScreenProps<AuthStackParamList, 'userType'>
type RouteType = RouteProp<AuthStackParamList, 'userType'>

const PickType: React.FC<Props> = () => {
  const route = useRoute<RouteType>()
  const { register } = useAuthActions()

  const handlePress = async (type: number): Promise<void> => {
    const dto = {
      ...route.params,
      type_id: type
    }
    
    try {
      await register(dto)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.content}>
        <CustomTitle>Olá!</CustomTitle>
        <Text variant="titleMedium">Qual é seu objetivo no Imobify?</Text>
        <PickTypeCard
          header="Anunciar"
          description="Quero anunciar meus imóveis"
          imageSource={announcerImage}
          handlePress={() => handlePress(2)}
        />
        <PickTypeCard
          header="Buscar"
          description="Quero encontrar um imóvel para mim"
          imageSource={searchImage}
          handlePress={() => handlePress(1)}
        />
      </View>
    </ImageBackground>
  )
}

export default PickType
