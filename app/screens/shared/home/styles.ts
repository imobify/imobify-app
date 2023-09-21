/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export const customMapStyle = [
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi.business',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
]