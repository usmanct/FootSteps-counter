import { ScrollView, StyleSheet, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import WaterProgress from '../components/waterTrackScreen/WaterProgress'
import HistoryChat from '../components/waterTrackScreen/HistoryChat'
import { useDatabase } from '../sqLiteDb/useDatabase'
import { AppContext } from '../contextApi/AppContext'
import CompleteAnimation from '../components/CompleteAnimation'
const WaterTrack = () => {

  const [barData, setbarData] = useState([])
  const now = new Date();
  const dateOnly = now.toLocaleDateString();
  const { waterHistory, drinkGoal, waterdrinked, IsgoalAchieved }: any = useContext(AppContext)
  const [goalAchieved, setGoalAchieved] = useState(false);

  const { getALLWaterData, getWaterData } = useDatabase()

  useEffect(() => {
    getALLWaterData();
    const waterDrinkedData = waterHistory.map((data: any) => ({
      value: data?.waterIntake,
      label: data?.date,
    }));
    setbarData([...waterDrinkedData]);

    // Check if the goal is achieved

  }, [waterHistory]);


  useEffect(() => {
    const totalIntake = waterdrinked

    if (totalIntake >= drinkGoal && IsgoalAchieved) {
      setGoalAchieved(true);
      setTimeout(() => setGoalAchieved(false), 10000); // hide overlay after 2 seconds
    }

  }, [waterdrinked])

  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        <Header />
        <WaterProgress />
        {/* <CanvasProgress/> */}
        <HistoryChat barData={barData} />
      </ScrollView>
      {goalAchieved && <CompleteAnimation isVisible={goalAchieved} />}
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