import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Progress from '../components/homeScreen/Progress'
import Stats from '../components/homeScreen/Stats'
import Bmi from '../components/homeScreen/Bmi'
import History from '../components/homeScreen/History'
import Header from '../components/Header'
import { useDatabase } from '../sqLiteDb/useDatabase'
import DataBaseInitialization from '../sqLiteDb/DataBaseInitialization'
import { AppState } from 'react-native';
import { AppContext } from '../contextApi/AppContext'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import StepCountingServiceComponent from '../services/ForegroundService'
import { useThemeChange } from '../apptheme/ThemeChange'
import OverLayScreen from '../components/OverLayScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
    currentType,
    setCurrentType,
    isPedometerRunning
  }: any = useContext(AppContext)
  const now = new Date();
  const dateOnly = now.toLocaleDateString();
  const { startService, stopService } = StepCountingServiceComponent()
  const { insertData, getData, updateFootStepRecord } = useDatabase();
  const [appState, setAppState] = useState(AppState.currentState);
  const [stepflag, setStepFlag] = useState(true)
  const useCustomTheme = useThemeChange()
  const [initialUpdateflag, setInitialUpdateflag] = useState<boolean>(false)
  const [showOverLay, setShowOverLay] = useState(false)
  useEffect(() => {
    DataBaseInitialization()
    initialLoad()
  }, [])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     initialLoad();

  //   }, [])
  // );



  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, isPedometerRunning])



  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'background' && isPedometerRunning ) {
      startService();
      // Start the background service when the app goes to the background
    } else if (nextAppState === 'active') {
      initialLoad()
      stopService();
      // Stop the backgroun\d service when the app comes to the foreground
    }
  };


  useEffect(() => {
    if (initialUpdateflag) {
      console.log(currentStepCount, "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
      updateFootStepRecord(dateOnly, currentStepCount, target, kcal, distance).then(async () => {
        const res = await getData(dateOnly)
        console.log('inside updater active Mode', res);
      }).catch((e) => {
        console.error('Error=====:', e);
      })
    }
    // setInitialUpdateflag(true)
  }, [currentStepCount, kcal, distance, target])



  useEffect(() => {
    const interval = setInterval(async () => {
      const newNow = new Date();
      const newDateOnly = newNow.toLocaleDateString();
      const res: any = await getData(newDateOnly);
      if (newDateOnly !== dateOnly && !res && res.length === 0) {
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
      const mode = await AsyncStorage.getItem('currentMode')
      setCurrentType(mode);
      const res: any = await getData(dateOnly);
      console.log('res from Initial Load========', res)
      if (res && res.length > 0) {
        setCurrentStepCount(res[0].footsteps);
        setKcal(res[0].energy);
        setDistance(res[0].distance);
        setTarget(res[0].goal);
        console.log("Inside Initial Load")
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
    <ScrollView
      contentContainerStyle={{ backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white', position: 'relative' }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        currentType={currentType}
      />
      <Progress
        currentStepCount={currentStepCount}
        setCurrentStepCount={setCurrentStepCount}
        kcal={kcal}
        distance={distance}
        setKcal={setKcal}
        setDistance={setDistance}
        target={target}
        setTarget={setTarget}
        stepflag={stepflag}
        setStepFlag={setStepFlag}
        currentType={currentType}
        setInitialUpdateflag={setInitialUpdateflag}
        showOverLay={showOverLay}
        setShowOverLay={setShowOverLay}
      />
      <Stats
        currentStepCount={currentStepCount}
        setCurrentStepCount={setCurrentStepCount}
        kcal={kcal}
        setKcal={setKcal}
        distance={distance}
        setDistance={setDistance}
      />
      <Bmi />
      <History
        currentStepCount={currentStepCount}
        setCurrentStepCount={setCurrentStepCount}
        kcal={kcal}
        setKcal={setKcal}
        distance={distance}
        setDistance={setDistance}
        currentType={currentType}
        target={target}
      />
      <OverLayScreen showOverLay={showOverLay} />
    </ScrollView>
  )
}

export default Home