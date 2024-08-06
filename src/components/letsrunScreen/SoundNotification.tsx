import { StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import CustomSwitch from './CustomSwitch';

const SoundNotification = ({rowTitle}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.row}>
            <Text style={styles.rowText}>{rowTitle}</Text>
            <CustomSwitch isEnabled={isEnabled} onValueChange={toggleSwitch} />
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