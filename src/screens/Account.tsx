import { StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native'
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
import PrivacyPolicyAndRating from '../components/PrivacyPolicyAndRating'
// import { startRunningreminderService } from '../services/ForegroundService'

const Account = () => {

  const formatNumber = (num: { toString: () => string; }) => num.toString().padStart(2, '0');
  const dataMin = Array.from({ length: 60 }, (_, i) => formatNumber(i));
  const dataHour = Array.from({ length: 12 }, (_, i) => formatNumber(i + 1));
  const md: any = ['AM', 'PM']
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [reminderTime, setReminderTime] = useState<any>({
    h: 0,
    m: 0,
    md: 'AM'
  })
  const [reimderDefaultIndex, setReminderDefaultIndex] = useState({
    h: 0,
    m: 0,
    md: 0
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
      setLoading(true)
      try {
        const savedReminderTime = await AsyncStorage.getItem('reminderTime');
        if (savedReminderTime) {
          console.log('ReminderTime', savedReminderTime)
          setReminderTime(JSON.parse(savedReminderTime));
          setReminderDefaultIndex({
            h: dataHour.indexOf(JSON.parse(savedReminderTime).h),
            m: dataMin.indexOf(JSON.parse(savedReminderTime).m),
            md: md.indexOf(JSON.parse(savedReminderTime).m)
          })
        }

      } catch (e) {
        console.error("Failed to load settings from AsyncStorage", e);
      }
      finally {
        setLoading(false)
      }
    };
    console.log('ReminderTime')
    loadSettings();
  }, []);

  useEffect(() => {
    setReminderDefaultIndex({
      h: dataHour.indexOf(reminderTime.h),
      m: dataMin.indexOf(reminderTime.m),
      md: md.indexOf(reminderTime.md)
    })
  }, [reminderTime])

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

  if (loading) {
    return (
      <View style={
        {
          ...styles.loaderContainer,
          backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white'
        }
      }>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
          <LetsRunRow title={'Notification Time'} subtil={`${reminderTime.h}:${reminderTime.m} ${reminderTime.md === 0 ? 'AM' : 'PM'}`} onpress={() => toggleModal('account')} currentType={currentType} />
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Profile currentType={currentType} showOverLay={showOverLay} setShowOverLay={setShowOverLay} />
      </View>
      <View style={styles.subcontainer}>
        <PrivacyPolicyAndRating currentType={currentType} />
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
        dataMin={dataMin}
        dataHour={dataHour}
        setReminderDefaultIndex={setReminderDefaultIndex}
        reimderDefaultIndex={reimderDefaultIndex}
        md={md}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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