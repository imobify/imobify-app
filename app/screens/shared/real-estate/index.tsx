import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '@routes/home.routes'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { useRealEstateDetails } from '@hooks/queries/useRealEstateDetails'
import Loading from '@components/loading'
import { Button } from 'react-native-paper'
import { useUser } from '@stores/authStore'

type Props = NativeStackScreenProps<HomeStackParamsList, 'realEstate'>

const RealEstate: React.FC<Props> = ({ route, navigation }: Props) => {
  const { id } = route.params
  const { userId } = useUser()

  if (!id) {
    navigation.navigate('map')
  }

  const { data, isLoading, isError } = useRealEstateDetails(id)

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ERRO</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {JSON.stringify(data)}
      </Text>

      {userId === data?.owner_id && (
        <Button
          onPress={() => navigation.getParent()?.navigate('realEstateRoutes', { screen: 'edit' })}
        >
          <Text>EDIT THIS</Text>
        </Button>
      )}
    </SafeAreaView>
  )
}

export default RealEstate