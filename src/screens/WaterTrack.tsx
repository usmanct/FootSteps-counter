import { ScrollView, StyleSheet, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import WaterProgress from '../components/waterTrackScreen/WaterProgress'
import HistoryChat from '../components/waterTrackScreen/HistoryChat'
import { useDatabase } from '../sqLiteDb/useDatabase'
import { AppContext } from '../contextApi/AppContext'
import CompleteAnimation from '../components/CompleteAnimation'
import DataBaseInitialization from '../sqLiteDb/DataBaseInitialization'
const WaterTrack = () => {

  const [barData, setbarData] = useState([])
  const now = new Date();
  const dateOnly = now.toLocaleDateString();
  const {
    waterHistory,
    setFillContainer,
    MAX_HEIGHT
  }: any = useContext(AppContext)
  const [updateflag, setUpdateflag] = useState(true);
  const [currentDate, setCurrentDate] = useState(dateOnly);
  const [drinkGoal, setDrinkGoal] = useState(1000)
  const [cupCapacity, setCupCapacity] = useState(50)
  const [waterdrinked, setwaterdrinked] = useState<any>(0)
  const [IsgoalAchieved, setISgoalAchieved] = useState(false)
  const { getALLWaterData, updateWaterRecord, insertWaterData, getWaterData } = useDatabase()

  useEffect(() => {
    const waterDrinkedData = waterHistory.map((data: any) => ({
      value: data?.waterIntake,
      label: data?.date,
    }));
    setbarData([...waterDrinkedData]);

    // Check if the goal is achieved

  }, [waterdrinked, waterHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      const newDateOnly = newNow.toLocaleDateString();
      if (newDateOnly !== dateOnly) {
        insertWaterData(dateOnly, waterdrinked, cupCapacity, drinkGoal).then(() => {
          console.log('Data inserted successfully');
        }).catch(error => {
          console.error('Error inserting data:', error);
        });
        setwaterdrinked(0); // Reset the steps for the new day
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [dateOnly]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data: any = await getWaterData(dateOnly);
        if (data) {
          console.log('data====', data[0]);
          if (data[0]?.goal == data[0]?.waterIntake) {
            console.log('goal', data[0]?.goal, data[0]?.waterIntake)
            setISgoalAchieved(true)
          }
          setDrinkGoal(data[0]?.goal);
          setCupCapacity(data[0]?.cupCapacity);
          setwaterdrinked(data[0]?.waterIntake);
          setFillContainer((data[0]?.waterIntake / data[0]?.goal) * MAX_HEIGHT);

        }
      } catch (error) {
        console.error('Failed to load initial data', error);
      }
    };
    getALLWaterData()

    loadInitialData();
  }, []);

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


  // useEffect(() => {
  //   const totalIntake = waterdrinked

  //   if (totalIntake >= drinkGoal && IsgoalAchieved) {
  //     setGoalAchieved(true);
  //     setTimeout(() => setGoalAchieved(false), 10000); // hide overlay after 2 seconds
  //   }

  // }, [waterdrinked])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newNow = new Date();
  //     const newDateOnly = newNow.toLocaleDateString();

  //     if (newDateOnly !== currentDate) {
  //       // Date has changed, insert data and update current date
  //       insertWaterData();
  //       setCurrentDate(newDateOnly);
  //     }
  //     else{
  //       insertWaterData();
  //       // updateWaterRecord(currentDate)
  //     }
  //   }, 60000); // Check every minute

  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [currentDate, insertWaterData, waterdrinked]);


  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        <Header />
        <WaterProgress
          drinkGoal={drinkGoal}
          setDrinkGoal={setDrinkGoal}
          cupCapacity={cupCapacity}
          setCupCapacity={setCupCapacity}
          waterdrinked={waterdrinked}
          setwaterdrinked={setwaterdrinked}
          IsgoalAchieved={IsgoalAchieved}
          setISgoalAchieved={setISgoalAchieved}
        />
        {/* <CanvasProgress/> */}
        <HistoryChat barData={barData} />
      </ScrollView>
      {/* {goalAchieved && <CompleteAnimation isVisible={goalAchieved} />} */}
    </View>
  )
}

export default WaterTrack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

})