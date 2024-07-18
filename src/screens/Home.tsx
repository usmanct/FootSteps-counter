import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Progress from '../components/homeScreen/Progress'
import Stats from '../components/homeScreen/Stats'
import Bmi from '../components/homeScreen/Bmi'
import History from '../components/homeScreen/History'
import Header from '../components/Header'


const Home = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [kcal, setKcal] = useState<any>(0);
  const [distance, setDistance] = useState<any>(0);

  return (
    <ScrollView>
      <Header />
      <Progress currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount}  />
      <Stats currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />
      <Bmi />
      <History currentStepCount={currentStepCount} />
    </ScrollView>
  )
}

export default Home