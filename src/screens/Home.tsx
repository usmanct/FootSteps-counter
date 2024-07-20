import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Progress from '../components/homeScreen/Progress'
import Stats from '../components/homeScreen/Stats'
import Bmi from '../components/homeScreen/Bmi'
import History from '../components/homeScreen/History'
import Header from '../components/Header'
import initializeDatabase from '../sqLiteDb/DataBaseInitialization'
import BottomNavigationBar from '../bottomNavigation/BottomNavigationBar'


const Home = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [kcal, setKcal] = useState<any>(0);
  const [distance, setDistance] = useState<any>(0);

 

  return (
    <ScrollView>
      <Header />
      <Progress currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} distance={distance} />
      <Stats currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />
      <Bmi />
      <History currentStepCount={currentStepCount} setCurrentStepCount={setCurrentStepCount} kcal={kcal} setKcal={setKcal} distance={distance} setDistance={setDistance} />
      
    </ScrollView>
  )
}

export default Home