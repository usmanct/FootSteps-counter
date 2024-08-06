import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import RunnerMap from '../components/letsrunScreen/RunnerMap'
import RunnerActions from '../components/letsrunScreen/RunnerActions'

const LetsRun = () => {

  const [timeDuration, settimeDuration] = useState({
    h: 0,
    m: 0
  })
  const [distanceCovered, setDsitanceCovered] = useState(0)
  const [kcalBurn, setkcalBurn] = useState(0)



  return (
    <View style={styles.container}>
      <Header />
      <RunnerMap />
      <RunnerActions
        timeDuration={timeDuration}
        settimeDuration={settimeDuration}
        distanceCovered={distanceCovered}
        setDsitanceCovered={setDsitanceCovered}
        kcalBurn={kcalBurn}
        setkcalBurn={setkcalBurn}
      />
    </View>
  )
}

export default LetsRun

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

})