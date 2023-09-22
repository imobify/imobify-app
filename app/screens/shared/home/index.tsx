import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { HomeStackParamsList } from '@routes/home.routes'
import useLocation from '@hooks/useLocation'
import { customMapStyle, styles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Loading from '@components/loading'
import { useNearbyRealEstates } from '@hooks/queries/useNearbyRealEstates'
import { Text } from 'react-native-paper'
import { theme } from '@theme'

type Props = NativeStackScreenProps<HomeStackParamsList, 'map'>

const Home: React.FC<Props> = ({ navigation }: Props) => {
  const { location } = useLocation()
  const { data, isLoading, isError } = useNearbyRealEstates(location?.coords)

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
          <MaterialCommunityIcons name='account-circle' color='#27a8e8' size={36} />
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
            <MaterialCommunityIcons name='map-marker-radius' color={theme.colors.tertiary} size={48} />
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  )
}

export default Home
