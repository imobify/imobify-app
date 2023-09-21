import { useState, useRef, useEffect } from 'react'
import { LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location'
import MapView from 'react-native-maps'

const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const mapRef = useRef<MapView>(null)

  const requestLocationPermission = async () => {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      setLocation(currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermission()
  }, [])

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

  return { mapRef, location }
}

export default useLocation