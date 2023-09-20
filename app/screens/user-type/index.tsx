/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ImageBackground, View } from 'react-native'
import { useRoute, type RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text } from 'react-native-paper'

import { CustomText } from '../../components/custom-text'
import PickTypeCard from '../../components/pick-type-card'
import { AuthStackParamList } from '../../routes/auth.routes'
import { useAuthActions } from '../../stores/authStore'


import { styles } from './styles'

const background = require('../../../assets/user-type-background.png')
const announcerImage = require('../../../assets/announce.png')
const searchImage = require('../../../assets/search.png')

type Props = NativeStackScreenProps<AuthStackParamList, 'pick-type'>
type RouteType = RouteProp<AuthStackParamList, 'pick-type'>

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
        <CustomText variant="title">Olá!</CustomText>
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
