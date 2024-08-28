import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const StatsCard = ({ icon, value, unit, isFirst , letsRunScreen }: any) => {

    return (
        <View style={{ ...styles.container, width: letsRunScreen ? '25%' : '33%' }}>
            <Text style={{ fontWeight: 'bold' }}>{value}</Text>
            <Text style={styles.label}>{unit}</Text>
            <Image
                source={icon}
                style={{ width: 40, height: 40 }}
                resizeMode='contain'
            />
        </View>
    )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3eff8',
        alignItems: 'center',
        gap: 7,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 15,
    },
    firstContainer: {
        borderLeftWidth: 0,
    },
    label: {
        color: '#8d8891',
        fontSize: 14,
        fontWeight: 'bold',

    }
})