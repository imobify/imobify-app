/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Image } from 'react-native'

const LogoWithTitle = () => {
  return (
    <Image
      source={require('../../assets/logo-with-title.png')}
      width={72}
      height={72}
    />
  )
}

export default LogoWithTitle
