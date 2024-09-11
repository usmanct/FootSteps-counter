import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';

const SoundNotification = (
    { rowTitle,
        reminderTime,
        setReminderTime,
        reminderFlag,
        setReminderFlag,
        setToggleService,
        toggleService,
        styleProp,
        currentType,
        isPedometerRunning,
        setIsPedometerRunning
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
    }, [isPedometerRunning, reminderFlag, rowTitle])

    const toggleSwitch = async () => {
        // Toggle switch and update reminderFlag state

        if (rowTitle === 'Daily Step Reminder') {
            console.log('reminderFlag--', reminderFlag)
            setToggleService(!toggleService);
            setReminderFlag(!reminderFlag)
            const a: boolean = reminderFlag === true ? false : true;
            setIsEnabled(a)
            console.log('bbbb', a)
            await AsyncStorage.setItem('reminderFlag', JSON.stringify(a));
        }
        else if (rowTitle === 'StepCounter') {
            console.log('isPedometerRunning', isPedometerRunning)
            setToggleService(!toggleService);
            setIsPedometerRunning(!isPedometerRunning)
            const a: boolean = isPedometerRunning === true ? false : true;
            setIsEnabled(a)
            console.log('aaaaa', a)
            await AsyncStorage.setItem('PedemeterState', JSON.stringify(a));

            if (toggleService) {

            }
            else {

            }
        }
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

export default SoundNotification;

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
