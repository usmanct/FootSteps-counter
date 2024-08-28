import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../contextApi/AppContext';

const SoundNotification = ({ rowTitle, reminderTime, setReminderTime, reminderFlag, setReminderFlag, setToggleService, toggleService , styleProp }: any) => {
    const [isEnabled, setIsEnabled] = useState(reminderFlag || false);
    const {
        currentStepCount,
        setCurrentStepCount,
    }: any = useContext(AppContext)
    useEffect(() => {
        const saveSettings = async () => {
            try {
                // Ensure reminderFlag is either true or false
                const valueToStore = reminderFlag !== undefined ? JSON.stringify(reminderFlag) : 'false';
                await AsyncStorage.setItem('reminderFlag', valueToStore);
            } catch (e) {
                console.error("Failed to save settings to AsyncStorage", e);
            }
        };

        saveSettings();
    }, [reminderFlag]);

    useEffect(() => {
        if (rowTitle === 'StepCounter') {
            setIsEnabled(toggleService)
        }
    }, [])

    const toggleSwitch = () => {
        // Toggle switch and update reminderFlag state

        if (rowTitle === 'Daily Step Reminder') {
            const newState = !isEnabled;
            setIsEnabled(newState);
            setReminderFlag(newState);
        }
        else if (rowTitle === 'StepCounter') {
            setIsEnabled(toggleService)
            if (toggleService) {
            
            }
            else {

            }
        }
    };

    return (
        <View style={{...styles.row , ...styleProp}}>
            <Text style={styles.rowText}>{rowTitle}</Text>
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
        backgroundColor:'#e9eaee'
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
