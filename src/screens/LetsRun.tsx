import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNavigationBar from '../bottomNavigation/BottomNavigationBar'

const LetsRun = () => {
  return (
    <View style={styles.container}>
      <Text>LetsRun</Text>
    </View>
  )
}

export default LetsRun

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
})