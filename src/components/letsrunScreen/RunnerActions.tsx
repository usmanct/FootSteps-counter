import { StyleSheet, Text, Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SoundNotification from './SoundNotification'
import Row from '../waterTrackScreen/Row'
import LetsRunRow from './LetsRunRow'
import RunningSettingModal from './RunningSettingModal'
import StatsCard from '../homeScreen/StatsCard'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeChange } from '../../apptheme/ThemeChange'
const RunnerActions = ({
  timeDuration,
  settimeDuration,
  distanceCovered,
  setDsitanceCovered,
  kcalBurn,
  setkcalBurn,
  IsRunning,
  setIsRunning,
  mapRef,
  errorMsg,
  location,
  routeCoordinates,
  speed,
  setSpeed,
  totalDistance,
  settargetKcalBurn,
  targetKcalBurn,
  setTotalDistance,
  runningState,
  setRunningState,
  setTimeReached,
  timeReached,
  currentType,
  showOverLay,
  setShowOverLay
}: any) => {

  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation();
  const [modalType, setModalType] = useState('')
  const [time, setTime] = useState(1);
  const useCustomTheme = useThemeChange()


  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (IsRunning && runningState) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Increment time by 1 second
      }, 1000);
    } else {
      clearInterval(interval);
      // onStopHandler() 
    }
    if (timeReached) {
      onStopHandler()
    }
    return () => clearInterval(interval);
  }, [IsRunning, runningState, timeReached]);



  useEffect(() => {
    // I assume here Weight is 72
    if (IsRunning && runningState) {
      const kcalPerKm = 72 * 1.036
      const totalKcal = kcalPerKm * totalDistance / 1000
      setkcalBurn(totalKcal)
      console.log("totalDistance: ", totalDistance)
      console.log("time: ", time)
      const pace = (totalDistance / time).toFixed(2)
      console.log("pace", pace)
      setSpeed(pace === 'NaN' ? 0 : pace)
    }
  }, [totalDistance, IsRunning, runningState])



  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)
    setShowOverLay(!showOverLay)

  }

  const letsRunHandler = () => {
    setIsRunning(!IsRunning);
    setRunningState(!runningState)
    setTime(0); // Initialize time to 00:00:00
    setSpeed(0)
    console.log('Running');
  };

  const pauscontinueHandler = () => {
    setRunningState(!runningState)
    console.log('Running', runningState);
    // setIsRunning(!IsRunning);
  }

  const onStopHandler = () => {
    setIsRunning(false)
    setRunningState(false)
    navigation.navigate('Runningresult',
      {
        mapRef,
        errorMsg,
        location,
        routeCoordinates,
        kcalBurn,
        distanceCovered,
        time,
        speed,
        setSpeed,
        totalDistance,
        setkcalBurn,
        setTotalDistance,
        currentType
      } as never)
  }

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${sec}`;
  };

  return (
    !IsRunning ? (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <SoundNotification
            rowTitle={'Sound Notifications'}
            reminderTime={undefined}
            setReminderTime={undefined}
            reminderFlag={undefined}
            setReminderFlag={undefined}
            currentType={currentType}
          />
          <View
            style={
              {
                backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header,
                borderRadius: 10,
                paddingVertical: 10,
                marginVertical: 10
              }
            }
          >
            <LetsRunRow title={'Duration'} subtil={`${timeDuration.h} hour ${timeDuration.m} mins`} onpress={() => toggleModal('duration')} currentType={currentType} />
            <LetsRunRow title={'Distance'} subtil={`${distanceCovered} km`} onpress={() => toggleModal('distance')} currentType={currentType} />
            <LetsRunRow title={'Calories'} subtil={`${targetKcalBurn} kcal`} onpress={() => toggleModal('calories')} currentType={currentType} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={[styles.button, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.lightMode.Btn1 }]}
              onPress={letsRunHandler}>
              <Text style={styles.textStyle}>Let's Run</Text>
            </Pressable>
          </View>
        </View>
        <RunningSettingModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalType={modalType}
          setModalType={setModalType}
          reminderTime={undefined}
          setReminderTime={undefined}
          settimeDuration={settimeDuration}
          setDsitanceCovered={setDsitanceCovered}
          settargetKcalBurn={settargetKcalBurn}
          currentType={currentType}
          showOverLay={showOverLay}
          setShowOverLay={setShowOverLay}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={{ ...styles.container1, backgroundColor: currentType === 'dark' ? 'transparent' : 'white' }}>
          <StatsCard
            isFirst={true}
            icon={require('../../../assets/letsRunScreenAssets/speed_icon.png')}
            unit={'speed m/s'}
            value={Number(speed)}
            letsRunScreen={true}
          />
          <StatsCard
            isFirst={undefined}
            icon={require('../../../assets/letsRunScreenAssets/timer_icon.png')}
            unit={'time'}
            value={formatTime(time)}
            letsRunScreen={true}
          />
          <StatsCard
            icon={require('../../../assets/letsRunScreenAssets/calories_icon.png')}
            unit={'kcal'}
            isFirst={true}
            value={(kcalBurn).toFixed(2)}
            letsRunScreen={true}
          />
          <StatsCard
            icon={require('../../../assets/letsRunScreenAssets/distance_icon.png')}
            unit={'km'}
            isFirst={undefined}
            value={(totalDistance / 1000).toFixed(2)}
            letsRunScreen={true}
          />
        </View>
        <View style={styles.btnRow}>
          <Pressable
            style={[styles.button, styles.cancelBtn, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.darkMode.bmiButton }]}
            onPress={onStopHandler}>
            <Text style={[styles.textStyle]}>Stop</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: runningState ? currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : '#f89814' : '#5cd749' }]}
            onPress={pauscontinueHandler}>
            <Text style={[styles.textStyle]}>{runningState ? 'Pause' : 'Continue'}</Text>
          </Pressable>
        </View>
      </View>
    )

  )
}

export default RunnerActions

const styles = StyleSheet.create({
  container: {
    gap: 5,
    // backgroundColor:'red'
  },
  container1: {

    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    marginTop: 5,
    paddingVertical: 15,
    borderRadius: 8,
    gap: 15,
    paddingHorizontal: 10,
  },

  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14
  },
  cancelBtn: {
    backgroundColor: '#0fb4fc',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    gap: 10,
  }
})