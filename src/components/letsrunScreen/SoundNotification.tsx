import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';
import { registerBackgroundFetchAsync, registerWaterreminderTask, unregisterBackgroundFetchAsync, unregisterWaterReminderTask } from '../../services/BackgroundServices';

const SoundNotification = (
    {
        rowTitle,
        reminderTime,
        setReminderTime,
        reminderFlag,
        setReminderFlag,
        setToggleService,
        toggleService,
        styleProp,
        currentType,
        isPedometerRunning,
        setIsPedometerRunning,
        waterReminderFlag,
        setWaterReminderFlag
    }: any) => {
    const [isEnabled, setIsEnabled] = useState(reminderFlag || false);
    const {
        currentStepCount,
        setCurrentStepCount,
    }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()

    // useEffect(() => {
    //     const saveSettings = async () => {
    //         try {
    //             // Ensure reminderFlag is either true or false
    //             const valueToStore = reminderFlag !== undefined ? JSON.stringify(reminderFlag) : 'false';
    //             console.log("value", valueToStore)
    //             await AsyncStorage.setItem('reminderFlag', valueToStore);
    //         } catch (e) {
    //             console.error("Failed to save settings to AsyncStorage", e);
    //         }
    //     };

    //     saveSettings();
    // }, [reminderFlag]);

    useEffect(() => {
        if (rowTitle === 'StepCounter') {
            console.log("StepCounter", isPedometerRunning)
            setIsEnabled(isPedometerRunning)
        }
        else if (rowTitle === 'Daily Steo Reminder') {
            console.log('reminderFlag--++', reminderFlag)
            setIsEnabled(reminderFlag)
        }
        else if (rowTitle === 'Reminder') {
            console.log('waterReminderFlag--++', waterReminderFlag)
            setIsEnabled(waterReminderFlag)
        }
    }, [isPedometerRunning, reminderFlag, rowTitle , waterReminderFlag])

    // const toggleSwitch = async () => {
    //     // Toggle switch and update reminderFlag state

    //     if (rowTitle === 'Daily Step Reminder') {
    //         setToggleService(!toggleService);
    //         const updatedFlag = !reminderFlag;
    //         setReminderFlag(updatedFlag);
    //         setIsEnabled(updatedFlag);

    //         // Register or unregister background fetch task
    //         if (updatedFlag) {
    //             registerBackgroundFetchAsync();
    //         } else {
    //             unregisterBackgroundFetchAsync();
    //         }

    //         // Save reminderFlag state to AsyncStorage
    //         await AsyncStorage.setItem('reminderFlag', JSON.stringify(updatedFlag));

    //     }
    //     else if (rowTitle === 'StepCounter') {
    //         console.log('isPedometerRunning', isPedometerRunning)
    //         setToggleService(!toggleService);
    //         setIsPedometerRunning(!isPedometerRunning)
    //         const a: boolean = isPedometerRunning === true ? false : true;
    //         setIsEnabled(a)
    //         console.log('aaaaa', a)
    //         await AsyncStorage.setItem('PedemeterState', JSON.stringify(a));

    //         if (toggleService) {

    //         }
    //         else {

    //         }
    //     }
    //     else if (rowTitle === 'Reminder') {
    //         setToggleService(!toggleService);
    //         const updatedFlag = !waterReminderFlag;
    //         setWaterReminderFlag(updatedFlag);
    //         setIsEnabled(updatedFlag);
    //     }
    // };
    const toggleSwitch = async () => {
        let updatedFlag;

        if (rowTitle === 'Daily Step Reminder') {
            updatedFlag = !reminderFlag;
            setReminderFlag(updatedFlag);
            setIsEnabled(updatedFlag);

            // Register or unregister background fetch task
            updatedFlag ? registerBackgroundFetchAsync() : unregisterBackgroundFetchAsync();

            // Save reminderFlag state to AsyncStorage
            await AsyncStorage.setItem('reminderFlag', JSON.stringify(updatedFlag));

        } else if (rowTitle === 'StepCounter') {
            updatedFlag = !isPedometerRunning;
            setIsPedometerRunning(updatedFlag);
            setIsEnabled(updatedFlag);

            // Save pedometer state to AsyncStorage
            await AsyncStorage.setItem('PedemeterState', JSON.stringify(updatedFlag));

        } else if (rowTitle === 'Reminder') {
            updatedFlag = !waterReminderFlag;
            updatedFlag ? registerWaterreminderTask() : unregisterWaterReminderTask();
            setWaterReminderFlag(updatedFlag);
            setIsEnabled(updatedFlag);

            // Save water reminder flag to AsyncStorage
            await AsyncStorage.setItem('waterReminderFlag', JSON.stringify(updatedFlag));
        }

        // Update the toggle service state if needed
        setToggleService((prev: any) => !prev);
    };
    return (
        <View style={{ ...styles.row, ...styleProp, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
            <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{rowTitle}</Text>
            <SwitchToggle
                switchOn={isEnabled}
                onPress={toggleSwitch}
                circleColorOff='#fff'
                circleColorOn='#2ecc71'
                backgroundColorOn='#6D6D6D'
                backgroundColorOff='#C4C4C4'
                containerStyle={{
                    width: 60,
                    height: 30,
                    borderRadius: 25,
                    padding: 5,
                }}
                circleStyle={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
export default SoundNotification;
