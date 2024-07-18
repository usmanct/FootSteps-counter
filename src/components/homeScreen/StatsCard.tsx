import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const StatsCard = ({ icon, value, unit, isFirst }) => {
    
    return (
        <View style={isFirst ? [styles.container, styles.firstContainer] : styles.container}>
            <Text>{icon}</Text>
            <Text style={{ fontWeight: 'bold' }}>{value}</Text>
            <Text style={{ fontSize: 10 }}>{unit}</Text>
        </View>
    )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'green',
        alignItems: 'center',
        width: '33%',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        gap: 7,
    },
    firstContainer: {
        borderLeftWidth: 0,
    },
})