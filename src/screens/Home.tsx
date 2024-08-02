import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Progress from '../components/homeScreen/Progress'
import Stats from '../components/homeScreen/Stats'
import Bmi from '../components/homeScreen/Bmi'
import History from '../components/homeScreen/History'
import Header from '../components/Header'
import { useDatabase } from '../sqLiteDb/useDatabase'
import DataBaseInitialization from '../sqLiteDb/DataBaseInitialization'
const Home = () => {

  const now = new Date();
  const dateOnly = now.toLocaleDateString();

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [kcal, setKcal] = useState<any>(0);
  const [distance, setDistance] = useState<any>(0);
  const { getData, updateWaterRecord, insertWaterData } = useDatabase()

  useEffect(() => {
    DataBaseInitialization()
  }, [])





  return (
    <ScrollView>
      <Header />
      <Progress currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} distance={distance} setKcal={setKcal} setDistance={setDistance} />
      <Stats currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />
      <Bmi />
      <History currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />

    </ScrollView>
  )
}

export default Home