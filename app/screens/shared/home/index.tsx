import { theme } from '@theme'
import { FAB, Text } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'

import Loading from '@components/loading'
import { useUser } from '@stores/authStore'
import useLocation from '@hooks/useLocation'
import { HomeTabNavigatorParams } from '@routes/types'
import { StackActions } from '@react-navigation/native'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNearbyRealEstates } from '@hooks/queries/useNearbyRealEstates'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { customMapStyle, styles } from './styles'

type Props = NativeStackScreenProps<HomeTabNavigatorParams, 'home'>

const Home: React.FC<Props> = ({ navigation }: Props) => {
  const { userType } = useUser()
  const { location } = useLocation()
  const { data, isLoading, isError, refetch } = useNearbyRealEstates(location)

  useRefreshOnFocus(refetch)

  if (!location || isLoading || !data) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ERROR...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005
        }}
        customMapStyle={customMapStyle}
      >
        <Marker 
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
        >
          <MaterialCommunityIcons name='map-marker' color='#27a8e8' size={36} />
        </Marker>
        {data.map((realEstate) => (
          <Marker 
            key={realEstate.id}
            coordinate={{
              longitude: realEstate.longitude,
              latitude: realEstate.latitude
            }}
            onPress={() => navigation.navigate('realEstate', { id: realEstate.id })}
          >
            <MaterialCommunityIcons name='home' color={theme.colors.tertiary} size={48} />
          </Marker>
        ))}
      </MapView>
      {userType === 2 ? (
        <FAB 
          icon='plus'
          style={styles.fab}
          // onPress={() => navigation.getParent()?.navigate('realEstateRoutes', { screen: 'form', params: {
          //   data: undefined
          // } })}
          onPress={() => navigation.dispatch(StackActions.push('realEstateForm', { id: undefined, data: {
            title: '',
            description: '',
            cep: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            uf: '',
            area: undefined,
            renting_value: undefined,
            selling_value: undefined,
            tax_value: undefined,
            isActive: false,
            photos: [],
          } }))}
          color={theme.colors.surface}
        />
      ) : null}
    </SafeAreaView>
  )
}

export default Home
