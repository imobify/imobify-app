import { useCallback, useEffect, useRef, useState } from 'react'

import { FAB } from 'react-native-paper'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { getCurrentPositionAsync, LocationAccuracy, LocationObject, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions, useFocusEffect } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Loading from '@components/loading'
import { useUser } from '@stores/authStore'
import SearchBar from '@components/searchbar'
import { QueryClient } from '@tanstack/react-query'
import { GetNearResponse } from '@models/realEstate'
import { HomeTabNavigatorParams } from '@routes/types'
import { getNearbyRealEstates } from '@services/real-estate'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { theme } from '@theme'

import { customMapStyle, styles } from './styles'

type Props = NativeStackScreenProps<HomeTabNavigatorParams, 'home'>

const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [realEstates, setRealEstates] = useState<GetNearResponse>([])
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<MapView>(null)
  const { userType } = useUser()

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const queryClient = new QueryClient()
        const { granted } = await requestForegroundPermissionsAsync()
  
        if (granted) {
          const location = await getCurrentPositionAsync()
          setLocation(location)
          const data = await queryClient.fetchQuery({ queryKey: ['nearby-real-estates'], queryFn: async () => await getNearbyRealEstates(location) })
          setRealEstates(data)
          setLoading(false)
        }
      })()
    }, [])
  )

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 100
    }, (response) => {
      setLocation(response)
      mapRef.current?.animateCamera({
        center: response.coords
      })
    })
  }, [])

  if (loading || !location) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {userType === 1 ? (
        <SearchBar 
          style={styles.searchBar}
        />
      ) : null}
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
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
        {realEstates!.map((realEstate) => (
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
