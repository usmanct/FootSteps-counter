import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Progress from '../components/homeScreen/Progress'
import Stats from '../components/homeScreen/Stats'
import Bmi from '../components/homeScreen/Bmi'
import History from '../components/homeScreen/History'
import Header from '../components/Header'
import { useDatabase } from '../sqLiteDb/useDatabase'
import DataBaseInitialization from '../sqLiteDb/DataBaseInitialization'

import { AppContext } from '../contextApi/AppContext'
import { startStepCountingService, stopService } from '../ForegroundService'
const Home = () => {



  const {
    currentStepCount,
    setCurrentStepCount,
    kcal,
    setKcal,
    distance,
    setDistance,
    target,
    setTarget,
}: any = useContext(AppContext)
  const now = new Date();
  const dateOnly = now.toLocaleDateString();

  
  const { insertData, getData, updateFootStepRecord } = useDatabase();
  //@ts-ignore
  useEffect(() => {
    DataBaseInitialization()
    initialLoad()
    startStepCountingService(currentStepCount)

    return () => {
      stopService()
    }

  }, [])


  useEffect(() => {
    updateFootStepRecord(dateOnly, currentStepCount, target, kcal, distance).then(() => {
      getData(dateOnly)
    }).catch((e) => {
      console.error('Error=====:', e);
    })
  }, [currentStepCount, kcal, distance, target])



  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      const newDateOnly = newNow.toLocaleDateString();
      if (newDateOnly !== dateOnly) {
        insertData(newDateOnly, currentStepCount, target, kcal, distance).then(() => {
          // console.log('Data inserted successfully');
        }).catch(error => {
          console.error('Error inserting data:', error);
        });
        setCurrentStepCount(0); // Reset the steps for the new day
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [dateOnly]);

  const initialLoad = async () => {
    console.log("initialLoad")
    try {
      const res: any = await getData(dateOnly);
      console.log('========', res)
      if (res && res.length > 0) {
        setCurrentStepCount(res[0].footsteps);
        setKcal(res[0].energy);
        setDistance(res[0].distance);
        setTarget(res[0].goal);
      } else {
        // If no data for the current date, insert a new row
        insertData(dateOnly, currentStepCount, target, kcal, distance).then(() => {
          // console.log('New data inserted for the current date');
        }).catch(error => {
          console.error('Error inserting new data:', error);
        });
      }
    } catch (error) {
      console.error('Failed to load initial data', error);
    }
  };




  return (
    <ScrollView>
      <Header />
      <Progress
        currentStepCount={currentStepCount}
        setCurrentStepCount={setCurrentStepCount}
        kcal={kcal}
        distance={distance}
        setKcal={setKcal}
        setDistance={setDistance}
        target={target}
        setTarget={setTarget}
      />
      <Stats currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />
      <Bmi />
      <History currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />

    </ScrollView>
  )
}

export default Home