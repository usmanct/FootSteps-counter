import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import WaterProgress from '../components/waterTrackScreen/WaterProgress'
const WaterTrack = () => {
  return (
    <ScrollView>
      <Header />
      <WaterProgress />
    </ScrollView>
  )
}

export default WaterTrack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})