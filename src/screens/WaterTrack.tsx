import { ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import WaterProgress from '../components/waterTrackScreen/WaterProgress'
import HistoryChat from '../components/waterTrackScreen/HistoryChat'
import { useDatabase } from '../sqLiteDb/useDatabase'
import { AppContext } from '../contextApi/AppContext'
const WaterTrack = () => {

  const [barData, setbarData] = useState([])
  const now = new Date();
  const { waterHistory }: any = useContext(AppContext)


  const { getALLWaterData } = useDatabase()

  useEffect(() => {
    getALLWaterData()
    const waterDrinkedData = waterHistory.map((data) => ({
      value: data.waterIntake, label: data.date
    }))
    setbarData([...waterDrinkedData])
    // console.log('waterDrinkedData', waterDrinkedData)
  }, [waterHistory])
  return (
    <ScrollView>
      <Header />
      <WaterProgress />
      {/* <CanvasProgress/> */}
      <HistoryChat barData={barData} />
    </ScrollView>
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

})