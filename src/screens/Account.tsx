import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SoundNotification from '../components/letsrunScreen/SoundNotification'
import LetsRunRow from '../components/letsrunScreen/LetsRunRow'
import BmiCalculations from './BmiCalculations'
import Profile from './Profile'

const Account = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.subcontainer}>
        <SoundNotification rowTitle={'StepCounter'} />
      </View>
      <View style={styles.subcontainer}>
        <SoundNotification rowTitle={'Daily Step Remainder'} />
        <LetsRunRow title={'Remainder Time'} subtil={'8:00'} onpress={undefined} />
      </View>
      <Profile />
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  subcontainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  }

})