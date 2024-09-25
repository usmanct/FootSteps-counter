import { StyleSheet, Text, Image, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SoundNotification from '../components/letsrunScreen/SoundNotification'
import LetsRunRow from '../components/letsrunScreen/LetsRunRow'
import Profile from './Profile'
import RunningSettingModal from '../components/letsrunScreen/RunningSettingModal'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemeSwitch from '../components/ThemeSwitch'
import { AppContext } from '../contextApi/AppContext'
import { useThemeChange } from '../apptheme/ThemeChange'
import OverLayScreen from '../components/OverLayScreen'
import { registerBackgroundFetchAsync } from '../services/BackgroundServices'
import StepCountingServiceComponent from '../services/ForegroundService'
// import { startRunningreminderService } from '../services/ForegroundService'

const Account = () => {



  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [reminderTime, setReminderTime] = useState({
    h: 0,
    m: 0
  })
  const [toggleService, setToggleService] = useState(false)
  const [showOverLay, setShowOverLay] = useState(false)
  const {
    currentType,
    isPedometerRunning,
    setIsPedometerRunning,
    reminderFlag,
    setReminderFlag,
  }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()



  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedReminderTime = await AsyncStorage.getItem('reminderTime');
        if (savedReminderTime) {
          console.log('ReminderTime', savedReminderTime)
          setReminderTime(JSON.parse(savedReminderTime));
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
        await AsyncStorage.setItem('reminderTime', JSON.stringify(reminderTime));
      } catch (e) {
        console.error("Failed to save settings to AsyncStorage", e);
      }
    };

    saveSettings();
  }, [reminderTime]);

  // useEffect(() => {
  //   if (reminderFlag) {
  //     const interval = setInterval(() => {
  //       const currentTime = new Date();
  //       console.log("Current time: ", currentTime.getHours(), currentTime.getMinutes())
  //       console.log("Reminder time: ", reminderTime);
  //       if (currentTime.getHours() === reminderTime.h && currentTime.getMinutes() === reminderTime.m) {
  //         console.log("ooo")
  //         registerBackgroundFetchAsync()
  //         clearInterval(interval);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [reminderFlag, reminderTime]);


  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)
    setShowOverLay(!showOverLay)
  }


  return (
    <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
      <View style={{ ...styles.headerRow, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
        <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Daily Step Counter </Text>
        <Image
          source={require('../../assets/homeScreenAssets/step_icon.png')}
          style={{ height: 30, width: 30 }}
          resizeMode='contain'
        />
      </View>
      <View style={styles.subcontainer}>
        <ThemeSwitch />
      </View>
      <View style={styles.subcontainer}>
        <SoundNotification
          rowTitle={'StepCounter'}
          reminderTime={undefined}
          setReminderTime={undefined}
          reminderFlag={undefined}
          setReminderFlag={undefined}
          toggleService={toggleService}
          setToggleService={setToggleService}
          currentType={currentType}
          isPedometerRunning={isPedometerRunning}
          setIsPedometerRunning={setIsPedometerRunning}
        />
      </View>
      <View style={{ ...styles.subcontainer, }}>

        <SoundNotification
          rowTitle={'Daily Step Reminder'}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          reminderFlag={reminderFlag}
          setReminderFlag={setReminderFlag}
          styleProp={
            {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingBottom: 10
            }
          }
          currentType={currentType}
          setToggleService={setToggleService}
          toggleService={toggleService}
        />
        <View style={{ backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 15 }}>
          <LetsRunRow title={'Notification Time'} subtil={`${reminderTime.h}:${reminderTime.m}`} onpress={() => toggleModal('account')} currentType={currentType} />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Profile currentType={currentType} showOverLay={showOverLay} setShowOverLay={setShowOverLay} />
      </View>
      <RunningSettingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalType={modalType}
        setModalType={setModalType}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        currentType={currentType}
        showOverLay={showOverLay}
        setShowOverLay={setShowOverLay}
      />
      <OverLayScreen modalVisible={modalVisible} showOverLay={showOverLay} />
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
    // justifyContent: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 15,
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
  },


})