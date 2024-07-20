import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNavigationBar from '../bottomNavigation/BottomNavigationBar'

const Account = () => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})