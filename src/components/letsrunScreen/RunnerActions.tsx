import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useState } from 'react'
import SoundNotification from './SoundNotification'
import Row from '../waterTrackScreen/Row'
import LetsRunRow from './LetsRunRow'
import RunningSettingModal from './RunningSettingModal'

const RunnerActions = ({ timeDuration, settimeDuration, distanceCovered, setDsitanceCovered, kcalBurn, setkcalBurn }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')


  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.container}>
      <RunningSettingModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalType={modalType} setModalType={setModalType} />
      <SoundNotification rowTitle={'Sound Notifications'} />
      <LetsRunRow title={'Duration'} subtil={`${timeDuration.h} hour ${timeDuration.m} mins`} onpress={() => toggleModal('duration')} />
      <LetsRunRow title={'Distance'} subtil={`${distanceCovered} km`} onpress={() => toggleModal('distance')} />
      <LetsRunRow title={'Calories'} subtil={`${kcalBurn} kcal`} onpress={() => toggleModal('calories')} />
      <View style={{ alignItems: 'center' }}>
        <Pressable
          style={[styles.button]}
          onPress={() => { }}>
          <Text style={styles.textStyle}>Let's Run</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RunnerActions

const styles = StyleSheet.create({
  container: {
    gap: 5
  },
  button: {
    backgroundColor: '#0cf249',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})