import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomSwitch from './CustomSwitch';
import { useNotification } from '../notifications/NotificationContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


const SoundNotification = ({ rowTitle, reminderTime, setReminderTime, reminderFlag, setReminderFlag }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        // schedulePushNotification('Foot-Steps Counter', 'Lets running for better health!');
        setIsEnabled(previousState => !previousState)
        setReminderFlag(previousState => !previousState);
    };

    // useEffect(() => {
    //     const loadSettings = async () => {
    //         try {
    //             const savedisEnabled = await AsyncStorage.getItem('isEnabled');

    //             if (savedisEnabled) {
    //                 console.log('Rrrr')
    //                 setIsEnabled(JSON.parse(savedisEnabled));
    //             }
    //         } catch (e) {
    //             console.error("Failed to load settings from AsyncStorage", e);
    //         }
    //     };

    //     loadSettings();
    // }, []);
    // useEffect(() => {
    //     const saveSettings = async () => {
    //         try {
    //             await AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
    //         } catch (e) {
    //             console.error("Failed to save settings to AsyncStorage", e);
    //         }
    //     };

    //     saveSettings();
    // }, [isEnabled]);


    return (
        <View style={styles.row}>
            <Text style={styles.rowText}>{rowTitle}</Text>
            <CustomSwitch isEnabled={isEnabled} onValueChange={toggleSwitch}  rowTitle={rowTitle}/>
        </View>
    )
}

export default SoundNotification

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
        fontWeight: 'bold'
    }
})