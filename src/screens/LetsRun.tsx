import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import RunnerMap from '../components/letsrunScreen/RunnerMap'
import RunnerActions from '../components/letsrunScreen/RunnerActions'

const LetsRun = () => {
  return (
    <View style={styles.container}>
      <Header />
      <RunnerMap />
      <RunnerActions />
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
  },

})