import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native'

import { theme } from '../theme'
import Svg, { Path } from 'react-native-svg'
import { PropsWithChildren } from 'react'

const Background = ({ children }: PropsWithChildren) => {

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.secondary }}>
      <View style={styles.top}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.topWave}
          >
            <Path
              fill={theme.colors.primary}
              d='M0,256L26.7,213.3C53.3,171,107,85,160,85.3C213.3,85,267,171,320,186.7C373.3,203,427,149,480,138.7C533.3,128,587,160,640,192C693.3,224,747,256,800,250.7C853.3,245,907,203,960,208C1013.3,213,1067,267,1120,272C1173.3,277,1227,235,1280,218.7C1333.3,203,1387,213,1413,218.7L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z'
            />
          </Svg>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.bottomWave}
          >
            <Path
              fill={theme.colors.primary}
              d='M0,32L20,37.3C40,43,80,53,120,85.3C160,117,200,171,240,197.3C280,224,320,224,360,192C400,160,440,96,480,74.7C520,53,560,75,600,112C640,149,680,203,720,186.7C760,171,800,85,840,85.3C880,85,920,171,960,176C1000,181,1040,107,1080,64C1120,21,1160,11,1200,48C1240,85,1280,171,1320,176C1360,181,1400,107,1420,69.3L1440,32L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z'
            />
          </Svg>
        </View>
      </View>
      <View style={styles.children}>{children}</View>
    </SafeAreaView>
  )
}

export default Background

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {},
  bottom: {
    position: 'absolute',
    width: screen.width,
    bottom: 0
  },
  box: {
    backgroundColor: theme.colors.primary,
    height: 78
  },
  topWave: {},
  bottomWave: {
    position: 'absolute',
    bottom: 20
  },
  children: {
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    display: 'flex',
  }
})