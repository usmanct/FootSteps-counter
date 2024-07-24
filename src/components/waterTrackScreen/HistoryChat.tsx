import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { AppContext } from '../../contextApi/AppContext';
import { useDatabase } from '../../sqLiteDb/useDatabase';
const screenWidth = Dimensions.get("window").width;

const HistoryChat = () => {
    const now = new Date();
    const { waterHistory , IsgoalAchieved }: any = useContext(AppContext)
    const [barData , setbarData] = useState([])

    const {getALLWaterData} = useDatabase()

    useEffect(() => {
        getALLWaterData()
        const waterDrinkedData = waterHistory.map((data) => ({ value: data.waterIntake }))
        setbarData([...waterDrinkedData])
        // console.log('waterDrinkedData', waterDrinkedData)
    }, [IsgoalAchieved])
    // console.log('waterDrinkedData', wdata)
    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>HistoryChat</Text>
            <BarChart
                frontColor={'#0cf249'}
                barWidth={22}
                data={barData}
            />
        </View>
    );
};

export default HistoryChat;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333'
    }
});
