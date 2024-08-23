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
  timeReached
}: any) => {

  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation();
  const [modalType, setModalType] = useState('')
  const [time, setTime] = useState(1);



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
    if(timeReached){
      onStopHandler()
    }
    return () => clearInterval(interval);
  }, [IsRunning, runningState , timeReached]);



  useEffect(() => {
    // I assume here Weight is 72
    if (IsRunning && runningState) {
      const kcalPerKm = 72 * 1.036
      const totalKcal = kcalPerKm * totalDistance / 1000
      setkcalBurn(totalKcal)
      const pace = totalDistance / time
      setSpeed(pace.toFixed(2))
    }
  }, [totalDistance, IsRunning, runningState])



  const toggleModal = (s: string) => {
    setModalType(s)
    setModalVisible(!modalVisible)

  }

  const letsRunHandler = () => {
    setIsRunning(!IsRunning);
    setRunningState(!runningState)
    setTime(0); // Initialize time to 00:00:00
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
        />
        <SoundNotification rowTitle={'Sound Notifications'} reminderTime={undefined} setReminderTime={undefined} reminderFlag={undefined} setReminderFlag={undefined} />
        <LetsRunRow title={'Duration'} subtil={`${timeDuration.h} hour ${timeDuration.m} mins`} onpress={() => toggleModal('duration')} />
        <LetsRunRow title={'Distance'} subtil={`${distanceCovered} km`} onpress={() => toggleModal('distance')} />
        <LetsRunRow title={'Calories'} subtil={`${targetKcalBurn} kcal`} onpress={() => toggleModal('calories')} />
        <View style={{ alignItems: 'center' }}>
          <Pressable
            style={[styles.button]}
            onPress={letsRunHandler}>
            <Text style={styles.textStyle}>Let's Run</Text>
          </Pressable>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.container1}>
          <StatsCard isFirst={true} icon={<Ionicons name="speedometer" size={14} color="blue" />} unit={'speed m/s'} value={speed} />
          <StatsCard isFirst={undefined} icon={<AntDesign name="clockcircleo" size={14} color="red" />} unit={'time'} value={formatTime(time)} />
          <StatsCard icon={<SimpleLineIcons name="fire" size={14} color="red" />} unit={'kcal'} isFirst={undefined} value={(kcalBurn).toFixed(2)} />
          <StatsCard icon={<Octicons name="location" size={14} color="green" />} unit={'km'} isFirst={undefined} value={(totalDistance / 1000).toFixed(2)} />
        </View>
        <View style={styles.btnRow}>
          <Pressable
            style={[styles.button, { backgroundColor: 'white', borderColor: 'red', borderWidth: 1 }]}
            onPress={onStopHandler}>
            <Text style={[styles.textStyle, { color: 'black' }]}>Stop</Text>
          </Pressable>
          <Pressable
            style={[styles.button]}
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
    backgroundColor: 'white',
    margin: 10,
    marginTop: 5,
    paddingVertical: 15,
    borderRadius: 8,
    gap: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0cf249',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    // width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    gap: 10,
  }
})