import { ScrollView, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import WaterProgress from '../components/waterTrackScreen/WaterProgress'
import HistoryChat from '../components/waterTrackScreen/HistoryChat'
import { useDatabase } from '../sqLiteDb/useDatabase'
import { AppContext } from '../contextApi/AppContext'
import { useThemeChange } from '../apptheme/ThemeChange'
import OverLayScreen from '../components/OverLayScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'
const WaterTrack = () => {
  const now = new Date();
  const dateOnly = now.toLocaleDateString();
  const {
    waterHistory,
    setFillContainer,
    MAX_HEIGHT,
    currentType,
    waterReminderFlag,
    setWaterReminderFlag,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    waterInterval,
    setWaterInterval
  }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()
  const [barData, setbarData] = useState<any>([])
  const [updateflag, setUpdateflag] = useState(true);
  const [drinkGoal, setDrinkGoal] = useState(1000)
  const [cupCapacity, setCupCapacity] = useState(50)
  const [waterdrinked, setwaterdrinked] = useState<any>(0)
  const [IsgoalAchieved, setISgoalAchieved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [measuringUnit, setMeasuringUnit] = useState<any>('ml')
  const { getALLWaterData, updateWaterRecord, insertWaterData, getWaterData } = useDatabase()
  const [showOverLay, setShowOverLay] = useState(false)
  useEffect(() => {
    const waterDrinkedData = waterHistory.map((data: any) => ({
      value: data?.waterIntake,
      label: data?.date,
    }));
    setbarData([...waterDrinkedData]);

    // Check if the goal is achieved

  }, [waterdrinked, waterHistory]);
  useEffect(() => {
    if (IsgoalAchieved) {
      setTimeout(() => {
        setShowOverLay(false)
      }, 5000);
    }
  }, [IsgoalAchieved])
  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      const newDateOnly = newNow.toLocaleDateString();
      if (newDateOnly !== dateOnly) {
        insertWaterData(dateOnly, waterdrinked, cupCapacity, drinkGoal).then(() => {
        }).catch(error => {
          console.error('Error inserting data:', error);
        });
        setwaterdrinked(0); // Reset the steps for the new day
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [dateOnly]);
  useEffect(() => {
    getALLWaterData();
    loadInitialData();
  }, [])
  const loadInitialData = async () => {
    try {

      const savedStartTime = await AsyncStorage.getItem('startTime');
      if (savedStartTime) {
        console.log('StartTime', savedStartTime)
        setStartTime(JSON.parse(savedStartTime));
      }
      const savedEndTime = await AsyncStorage.getItem('endTime');
      if (savedEndTime) {
        console.log('EndTime', savedEndTime)
        setEndTime(JSON.parse(savedEndTime));
      }
      const saveInterval = await AsyncStorage.getItem('Interval');
      if (saveInterval) {
        console.log('Interval', saveInterval)
        setWaterInterval(JSON.parse(saveInterval));
      }
      const savedReminderTime = await AsyncStorage.getItem('waterReminderFlag');
      if (savedReminderTime) {
        setWaterReminderFlag(JSON.parse(savedReminderTime));
      }

      const data: any = await getWaterData(dateOnly);
      if (data && data.length > 0) {
        if (data[0]?.goal == data[0]?.waterIntake) {
          setISgoalAchieved(true);
        }
        setDrinkGoal(data[0]?.goal);
        setCupCapacity(data[0]?.cupCapacity);
        setwaterdrinked(data[0]?.waterIntake);
        setFillContainer((data[0]?.waterIntake / data[0]?.goal) * MAX_HEIGHT);
      } else {
        // If no data for the current date, insert a new row
        insertWaterData(dateOnly, waterdrinked, cupCapacity, drinkGoal).then(() => {
        }).catch(error => {
          console.error('Error inserting new data:', error);
        });
      }
      const unitt = await AsyncStorage.getItem('unit');
      if (unitt !== null) {
        setMeasuringUnit(unitt);  // Set the parsed boolean value
      }
    } catch (error) {
      console.error('Failed to load initial data', error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (updateflag) {
      setUpdateflag(false);
      return
    }
    else {
      const updateAndFetchData = async () => {
        try {
          await updateWaterRecord(dateOnly, drinkGoal, cupCapacity, waterdrinked).then(() => {
            getALLWaterData()
          }).catch(() => { });

        } catch (error) {
          console.error(error);
        }
      };

      updateAndFetchData();
    }
  }, [waterdrinked, cupCapacity, drinkGoal]);
  if (loading) {
    return <Loader currentType={currentType} />
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white'
        }}
      >
        <Header currentType={currentType} />
        <WaterProgress
          drinkGoal={drinkGoal}
          setDrinkGoal={setDrinkGoal}
          cupCapacity={cupCapacity}
          setCupCapacity={setCupCapacity}
          waterdrinked={waterdrinked}
          setwaterdrinked={setwaterdrinked}
          IsgoalAchieved={IsgoalAchieved}
          setISgoalAchieved={setISgoalAchieved}
          currentType={currentType}
          showOverLay={showOverLay}
          setShowOverLay={setShowOverLay}
          setMeasuringUnit={setMeasuringUnit}
          measuringUnit={measuringUnit}
          waterReminderFlag={waterReminderFlag}
          setWaterReminderFlag={setWaterReminderFlag}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          waterInterval={waterInterval}
          setWaterInterval={setWaterInterval}
        />
        <HistoryChat
          barData={barData}
          currentType={currentType}
          cupCapacity={cupCapacity}
          drinkGoal={drinkGoal}
          setMeasuringUnit={setMeasuringUnit}
          measuringUnit={measuringUnit}
        />
      </ScrollView>
      <OverLayScreen
        showOverLay={showOverLay}
        type={'Complete_Animation'}
        waterdrinked={waterdrinked}
        measuringUnit={measuringUnit}
        drinkGoal={drinkGoal}
      />
    </View>)
}
export default WaterTrack