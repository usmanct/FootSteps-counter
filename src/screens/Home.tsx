import { ScrollView,} from 'react-native'
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
import StepCountingServiceComponent from '../services/ForegroundService'
import { useThemeChange } from '../apptheme/ThemeChange'
import OverLayScreen from '../components/OverLayScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'
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
    isPedometerRunning,
    setIsPedometerRunning,
    setReminderFlag,
    setUserData,
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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    DataBaseInitialization()
    initialLoad()
  }, [])
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();

    };
  }, [appState, isPedometerRunning])
  const handleAppStateChange = useCallback((nextAppState: string) => {
    if (nextAppState === 'background' && isPedometerRunning) {
      startService();
      // Start the background service when the app goes to the background
    } else if (nextAppState === 'active') {
      stopService();
      // Stop the backgroun\d service when the app comes to the foreground
    }
  } ,[isPedometerRunning]);
  useEffect(() => {
    if (initialUpdateflag) {
      updateFootStepRecord(dateOnly, currentStepCount, target, kcal, distance).then(async () => {
        const res = await getData(dateOnly)
      }).catch((e) => {
        console.error('Error=====:', e);
      })
    }
  }, [currentStepCount, kcal, distance, target])
  useEffect(() => {
    const interval = setInterval(async () => {
      const newNow = new Date();
      const newDateOnly = newNow.toLocaleDateString();
      const res: any = await getData(newDateOnly);
      if (newDateOnly !== dateOnly && !res && res.length === 0) {
        insertData(newDateOnly, currentStepCount, target, kcal, distance).then(() => {
        }).catch(error => {
          console.error('Error inserting data:', error);
        });
        setCurrentStepCount(0); // Reset the steps for the new day
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [dateOnly]);

  const initialLoad = async () => {
    try {
      const profileData: any = await AsyncStorage.getItem('userData');
      if (profileData) {
        const userData = JSON.parse(profileData);
        setUserData(userData); // Update the state with the retrieved data
      }

      const mode = await AsyncStorage.getItem('currentMode')
      if (mode !== null) {
        setCurrentType(mode);  // Set the parsed boolean value
      }
      const pedometerState = await AsyncStorage.getItem('PedemeterState');
      if (pedometerState !== null) {
        const parsedState = JSON.parse(pedometerState); // Ensure you parse it if it's not null
        setIsPedometerRunning(parsedState);  // Set the parsed boolean value
      }
      const notificationState = await AsyncStorage.getItem('reminderFlag');
      if (notificationState !== null) {
        const parsedState = JSON.parse(notificationState); // Ensure you parse it if it's not null
        setReminderFlag(parsedState);  // Set the parsed boolean value
      }

      const res: any = await getData(dateOnly);
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
    finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader currentType={currentType} />;
  }
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
