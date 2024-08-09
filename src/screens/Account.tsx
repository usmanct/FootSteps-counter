import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SoundNotification from '../components/letsrunScreen/SoundNotification'
import LetsRunRow from '../components/letsrunScreen/LetsRunRow'
import BmiCalculations from './BmiCalculations'
import Profile from './Profile'
import RunningSettingModal from '../components/letsrunScreen/RunningSettingModal'
import { useNotification } from '../components/notifications/NotificationContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerBackgroundFetchAsync } from '../BackgroundServices'

const Account = () => {

  const { schedulePushNotification }: any = useNotification();

  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [reminderTime, setReminderTime] = useState({
    h: 0,
    m: 0
  })
  const [reminderFlag, setReminderFlag] = useState(false)



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
        console.log("Befrore0,", reminderTime , reminderFlag)
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
            Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
          schedulePushNotification('Foot-Steps Counter', 'Let\'s running for better health!', 'Account');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [reminderFlag, reminderTime]);

  useEffect(() => {
    registerBackgroundFetchAsync().then(() => {
      console.log('Background fetch registered================================================================');
    }).catch(() => {
      console.log('Background fetch not registered================================================================')
    })
  }, [])



  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.container}>
      <Header />
      <RunningSettingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalType={modalType}
        setModalType={setModalType}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
      />
      <View style={styles.subcontainer}>
        <SoundNotification rowTitle={'StepCounter'} reminderTime={undefined} setReminderTime={undefined} reminderFlag={undefined} setReminderFlag={undefined} />
      </View>
      <View style={styles.subcontainer}>
        <SoundNotification rowTitle={'Daily Step Reminder'}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          reminderFlag={reminderFlag}
          setReminderFlag={setReminderFlag}
        />
        <LetsRunRow title={'Duration'} subtil={`${reminderTime.h}:${reminderTime.m}`} onpress={() => toggleModal('account')} />
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