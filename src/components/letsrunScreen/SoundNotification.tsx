import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SoundNotification = ({ rowTitle, reminderTime, setReminderTime, reminderFlag, setReminderFlag }) => {
    const [isEnabled, setIsEnabled] = useState(reminderFlag || false);

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

    const toggleSwitch = () => {
        // Toggle switch and update reminderFlag state
        const newState = !isEnabled;
        setIsEnabled(newState);
        if (rowTitle === 'Daily Step Reminder') {
            setReminderFlag(newState);
        }
    };

    return (
        <View style={styles.row}>
            <Text style={styles.rowText}>{rowTitle}</Text>
            <SwitchToggle
                switchOn={isEnabled}
                onPress={toggleSwitch}
                circleColorOff='#fff'
                circleColorOn='#2ecc71'
                backgroundColorOn='#6D6D6D'
                backgroundColorOff='#C4C4C4'
                containerStyle={{
                    marginTop: 16,
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});
