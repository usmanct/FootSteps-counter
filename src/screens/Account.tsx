import { Alert, StyleSheet, Text, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SoundNotification from '../components/letsrunScreen/SoundNotification'
import LetsRunRow from '../components/letsrunScreen/LetsRunRow'
import BmiCalculations from './BmiCalculations'
import Profile from './Profile'
import RunningSettingModal from '../components/letsrunScreen/RunningSettingModal'

import AsyncStorage from '@react-native-async-storage/async-storage'
// import { startRunningreminderService } from '../services/ForegroundService'

const Account = () => {


  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [reminderTime, setReminderTime] = useState({
    h: 0,
    m: 0
  })
  const [reminderFlag, setReminderFlag] = useState(false)
  const [toggleService, setToggleService] = useState(true)



  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedReminderTime = await AsyncStorage.getItem('reminderTime');
        const savedReminderFlag = await AsyncStorage.getItem('reminderFlag');

        if (savedReminderTime) {
          console.log('R---', savedReminderTime)
          setReminderTime(JSON.parse(savedReminderTime));
        }

        if (savedReminderFlag) {
          console.log('p---', savedReminderFlag)
          setReminderFlag(JSON.parse(savedReminderFlag));
        }
      } catch (e) {
        console.error("Failed to load settings from AsyncStorage", e);
      }
    };

    loadSettings();
  }, []);
  useEffect(() => {
    const saveSettings = async () => {
      try {
        console.log("Befrore0,", reminderTime, reminderFlag)
        await AsyncStorage.setItem('reminderTime', JSON.stringify(reminderTime));
      } catch (e) {
        console.error("Failed to save settings to AsyncStorage", e);
      }
    };

    saveSettings();
  }, [reminderTime, reminderFlag]);

  useEffect(() => {
    console.log('Reminder', reminderFlag)
    if (reminderFlag) {
      console.log('tttt')
      const interval = setInterval(() => {
        const currentTime = new Date();
        // console.log('currentTime', currentTime.getHours(), currentTime.getMinutes())
        if (currentTime.getHours() === reminderTime.h && currentTime.getMinutes() === reminderTime.m) {
          console.log('fffff')
          //Place the Alert Logic 
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [reminderFlag, reminderTime]);


  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>Daily Step Counter </Text>
        <Image
          source={require('../../assets/homeScreenAssets/step_icon.png')}
          style={{ height: 30, width: 30 }}
          resizeMode='contain'
        />
      </View>
      <RunningSettingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalType={modalType}
        setModalType={setModalType}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
      />
      <View style={styles.subcontainer}>
        <SoundNotification
          rowTitle={'StepCounter'}
          reminderTime={undefined}
          setReminderTime={undefined}
          reminderFlag={undefined}
          setReminderFlag={undefined}
          toggleService={toggleService}
          setToggleService={setToggleService}
        />
      </View>
      <View style={{ ...styles.subcontainer }}>
        <SoundNotification rowTitle={'Daily Step Reminder'}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          reminderFlag={reminderFlag}
          setReminderFlag={setReminderFlag}
          styleProp={
            {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingBottom : 10
            }
          }
        />
        <View style={{ backgroundColor: '#e9eaee', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 15 }}>
          <LetsRunRow title={'Duration'} subtil={`${reminderTime.h}:${reminderTime.m}`} onpress={() => toggleModal('account')} />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Profile />
      </View>
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
    // paddingHorizontal: 10,
    paddingVertical: 15,
  },
  subcontainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    paddingVertical: 15,
    backgroundColor: '#e9eaee',
    width: '100%'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }

})