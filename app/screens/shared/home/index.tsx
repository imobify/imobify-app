import { SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
// import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'

import { HomeStackParamsList } from '@routes/home.routes'
import useLocation from '@hooks/useLocation'
import { styles } from './styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<HomeStackParamsList, 'map'>

const Home: React.FC<Props> = () => {
  const { mapRef, location } = useLocation()

  return (
    <SafeAreaView style={styles.container}>
      {
        location && 
        <MapView 
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005
          }}
        >
          <Marker 
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />
        </MapView>
      }
    </SafeAreaView>
  )
}

export default Home
