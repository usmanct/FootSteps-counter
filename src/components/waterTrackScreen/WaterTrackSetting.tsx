import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Row from './Row'
import SetDrinkTarget from './SetDrinkTarget'
import { AppContext } from '../../contextApi/AppContext'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeChange } from '../../apptheme/ThemeChange'
import OverLayScreen from '../OverLayScreen'
import SoundNotification from '../letsrunScreen/SoundNotification'
import RunningSettingModal from '../letsrunScreen/RunningSettingModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerWaterreminderTask } from '../../services/BackgroundServices'

const WaterTrackSetting = ({ route }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [remindermodalVisible, setReminderModalVisible] = useState(false);
    const drinkGaolData: any = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
    const cupcapacitydata: any = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
    const md: any = ['AM', 'PM']
    const unitData: any = ['ml', 'oz']
    const formatNumber = (num: { toString: () => string; }) => num.toString().padStart(2, '0');
    const dataMin = Array.from({ length: 60 }, (_, i) => formatNumber(i));
    const dataHour = Array.from({ length: 12 }, (_, i) => formatNumber(i + 1));
    const dataHoursInterval = Array.from({ length: 13 }, (_, i) => formatNumber(i));
    const { drinkGoal,
        setDrinkGoal,
        setCupCapacity,
        setISgoalAchieved,
        setMeasuringUnit,
        measuringUnit,
        setWaterReminderFlag,
        setStartTime,
        setEndTime,
        waterInterval,
        setWaterInterval
    } = route.params;
    const isFocused = useIsFocused();
    const useCustomTheme = useThemeChange()
    const navigation = useNavigation();
    const [localDrinkGoal, setLocalDrinkGoal] = useState(route.params.drinkGoal);
    const [localCupCapacity, setLocalCupCapacity] = useState(route.params.cupCapacity)
    const [localMeasuringUnit, setLocalMeasuringUnit] = useState<any>(route.params.measuringUnit)
    const [localstartTime, setLocalStartTime] = useState(route.params.startTime)
    const [localendTime, setLocalEndTime] = useState(route.params.endTime)
    const [localWaterInterval, setLocalWaterInterval] = useState(route.params.waterInterval)
    const [defaultIndexcup, setDefaultIndexcup] = useState(0)
    const [defaultIndexgoal, setDefaultIndexgoal] = useState(0)
    const [defaultUnitIndex, setDefaultUnitIndex] = useState(0)
    const [showOverLay, setShowOverLay] = useState(false)
    const [toggleService, setToggleService] = useState(false)
    const [localWaterReminderFlag, setLocalWaterReminderFlag] = useState(route.params.waterReminderFlag)
    const {
        modalType,
        setModalType,
        currentType
    }: any = useContext(AppContext)
    const [startTimeDefaultIndex, setStartTimeDefaultIndex] = useState(
        {
            h: 0,
            m: 0,
            md: 0,
        }
    )
    const [endTimeDefaultIndex, setEndTimeDefaultIndex] = useState(
        {
            h: 0,
            m: 0,
            md: 0,
        }
    )
    const [intervalDefaultIndex, setIntervalTimeDefaultIndex] = useState(
        {
            h: 0,
            m: 0,
        }
    )
    useEffect(() => {
        if (isFocused) {
            setLocalDrinkGoal(route.params.drinkGoal);
            setLocalCupCapacity(route.params.cupCapacity);
            setLocalMeasuringUnit(route.params.measuringUnit);
        }
    }, [isFocused, route.params.drinkGoal, route.params.cupCapacity, route.params.measuringUnit]);
    useEffect(() => {
        setDefaultIndexcup(cupcapacitydata.indexOf(localCupCapacity))
        setDefaultIndexgoal(drinkGaolData.indexOf(localDrinkGoal))
        setDefaultUnitIndex(unitData.indexOf(localMeasuringUnit))
        setStartTimeDefaultIndex({
            h: dataHour.indexOf(localstartTime.h),
            m: dataMin.indexOf(localstartTime.m),
            md: md.indexOf(localstartTime.md)
        })
        setEndTimeDefaultIndex({
            h: dataHour.indexOf(localendTime.h),
            m: dataMin.indexOf(localendTime.m),
            md: md.indexOf(localendTime.md)
        })
        console.log("WaterINterval", waterInterval)
        setIntervalTimeDefaultIndex({
            h: dataHour.indexOf(localWaterInterval.h),
            m: dataMin.indexOf(localWaterInterval.m),
        })
    }, [localstartTime, localendTime, localWaterInterval])
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('startTime', JSON.stringify(localstartTime));
            } catch (e) {
                console.error("Failed to save settings to AsyncStorage", e);
            }
        };

        saveSettings();
    }, [localstartTime]);
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('endTime', JSON.stringify(localendTime));
            } catch (e) {
                console.error("Failed to save settings to AsyncStorage", e);
            }
        };

        saveSettings();
    }, [localendTime]);
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('Interval', JSON.stringify(localWaterInterval));
            } catch (e) {
                console.error("Failed to save settings to AsyncStorage", e);
            }
        };

        saveSettings();
        if (localWaterReminderFlag) {
            registerWaterreminderTask()
        }
    }, [localWaterInterval]);
    useEffect(() => {
        setISgoalAchieved(false);
    }, [localDrinkGoal, localCupCapacity]);
    const unitHandler = () => {
        setModalVisible(!modalVisible)
        setModalType('unit')
        console.warn('1')
    }
    const cupcapacityHandler = () => {
        setModalVisible(!modalVisible)
        setModalType('cupcapacity')
        console.warn('2')
    }
    const drinkgoalhandler = () => {
        setModalVisible(!modalVisible)
        setModalType('drinkgoal')
        console.warn('3')
    }
    const startTimeHandler = () => {
        setReminderModalVisible(!remindermodalVisible)
        setModalType('Start Time')
    }
    const endTimeHandler = () => {
        setReminderModalVisible(!remindermodalVisible)
        setModalType('End Time')
    }
    const intervalTimeHandler = () => {
        setReminderModalVisible(!remindermodalVisible)
        setModalType('Interval')
    }
    return (
        <View style={{ backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white', flex: 1 }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="keyboard-backspace" size={24} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text} />
                </TouchableOpacity>
                <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Water Track Settings</Text>
            </View>
            <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
                <Row title={"Unit"} onpress={unitHandler} subtil={localMeasuringUnit} currentType={currentType} measuringUnit={measuringUnit} />
                <Row title={"Cup Capacity"} subtil={localCupCapacity} onpress={cupcapacityHandler} currentType={currentType} measuringUnit={measuringUnit} />
                <Row title={"Drink Goal"} subtil={localDrinkGoal} onpress={drinkgoalhandler} currentType={currentType} measuringUnit={measuringUnit} />
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <SoundNotification
                    rowTitle={'Reminder'}
                    styleProp={{}}
                    currentType={currentType}
                    setToggleService={setToggleService}
                    toggleService={toggleService}
                    waterReminderFlag={localWaterReminderFlag}
                    setWaterReminderFlag={(value: any) => {
                        setWaterReminderFlag(value);
                        setLocalWaterReminderFlag(value);
                    }}
                />
            </View>
            <View
                style={
                    {
                        ...styles.container,
                        backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : !localWaterReminderFlag ? '#c7c7c7' : useCustomTheme.lightMode.Header
                    }
                }
                pointerEvents={localWaterReminderFlag ? 'auto' : 'none'}
            >
                {!localWaterReminderFlag ? <Text>Trun on Reminder for setting values</Text> : null}
                <Row title={'Start Time'} subtil={`${localstartTime.h}:${localstartTime.m} ${localstartTime.md === 0 ? 'AM' : 'PM'}`} currentType={currentType} onpress={startTimeHandler} />
                <Row title={'End Time'} subtil={`${localendTime.h}:${localendTime.m} ${localendTime.md === 0 ? 'AM' : 'PM'}`} currentType={currentType} onpress={endTimeHandler} />
                <Row title={'Interval'} subtil={`${localWaterInterval.h} hours:${localWaterInterval.m} mins`} currentType={currentType} onpress={intervalTimeHandler} />
            </View>
            <SetDrinkTarget
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                drinkGoal={drinkGoal}
                setDrinkGoal={(value: any) => {
                    setLocalDrinkGoal(value);
                    setDrinkGoal(value);
                }}
                cupCapacity={localCupCapacity}
                setCupCapacity={(value: any) => {
                    setLocalCupCapacity(value);
                    setCupCapacity(value);
                }}
                waterdrinked={route.params.waterdrinked}
                setwaterdrinked={route.params.setwaterdrinked}
                IsgoalAchieved={route.params.IsgoalAchieved}
                setISgoalAchieved={setISgoalAchieved}
                drinkGaolData={drinkGaolData}
                cupcapacitydata={cupcapacitydata}
                unitData={unitData}
                defaultIndexcup={defaultIndexcup}
                setDefaultIndexcup={setDefaultIndexcup}
                setDefaultUnitIndex={setDefaultUnitIndex}
                defaultIndexgoal={defaultIndexgoal}
                defaultUnitIndex={defaultUnitIndex}
                setDefaultIndexgoal={setDefaultIndexgoal}
                currentType={currentType}
                measuringUnit={measuringUnit}
                setMeasuringUnit={(value: any) => {
                    setMeasuringUnit(value);
                    setLocalMeasuringUnit(value);
                }}
            />
            <RunningSettingModal
                modalVisible={remindermodalVisible}
                setModalVisible={setReminderModalVisible}
                modalType={modalType}
                setModalType={setModalType}
                startTime={route.params.startTime}
                endTime={route.params.endTime}
                interval={route.params.interval}
                setInterval={(value: any) => {
                    setLocalWaterInterval({
                        h: value.h,
                        m: value.m,
                    });
                    setWaterInterval({
                        h: value.h,
                        m: value.m,
                    });
                }}
                setEndTime={(value: any) => {
                    setLocalEndTime({
                        h: value.h,
                        m: value.m,
                        md: value.md,
                    });
                    setEndTime({
                        h: value.h,
                        m: value.m,
                        md: value.md,
                    });
                }}
                setStartTime={(value: any) => {
                    setLocalStartTime({
                        h: value.h,
                        m: value.m,
                        md: value.md,
                    });
                    setStartTime({
                        h: value.h,
                        m: value.m,
                        md: value.md,
                    });
                }}
                currentType={currentType}
                showOverLay={showOverLay}
                setShowOverLay={setShowOverLay}
                startTimeDefaultIndex={startTimeDefaultIndex}
                setStartTimeDefaultIndex={setStartTimeDefaultIndex}
                endTimeDefaultIndex={endTimeDefaultIndex}
                setEndTimeDefaultIndex={setEndTimeDefaultIndex}
                setIntervalTimeDefaultIndex={setIntervalTimeDefaultIndex}
                intervalDefaultIndex={intervalDefaultIndex}
                dataMin={dataMin}
                dataHour={dataHour}
                md={md}
                dataHoursInterval={dataHoursInterval}
            />
            <OverLayScreen modalVisible={modalVisible || remindermodalVisible} />
        </View>
    )
}

export default WaterTrackSetting

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10, // Adjust to fit your layout
        justifyContent: 'center',
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});
