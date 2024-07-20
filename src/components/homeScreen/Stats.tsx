import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StatsCard from './StatsCard'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AppContext } from '../../contextApi/AppContext';

const Stats = ({ setCurrentStepCount, currentStepCount, kcal, setKcal, distance, setDistance }) => {
    const [time, setTime] = useState(new Date());
    const { state, setState }: any = useContext(AppContext);

    useEffect(() => {
        const energyWaste = parseFloat(currentStepCount) * 0.05
        setKcal(energyWaste.toFixed(2))
        const distanceCover = parseFloat(currentStepCount) * 0.60 / 1000.0
        setDistance(distanceCover.toFixed(3))
    }, [currentStepCount])

    // setState((pre: any) => ({
    //     ...pre,
    //     distance,
    //     energy: kcal
    // }))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Format time as HH:MM:SS
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <View style={styles.container}>
            <StatsCard isFirst={true} icon={<AntDesign name="clockcircleo" size={14} color="red" />} value={formatTime(time)} unit={'time'} />
            <StatsCard icon={<SimpleLineIcons name="fire" size={14} color="red" />} value={kcal} unit={'kcal'} isFirst={undefined} />
            <StatsCard icon={<Octicons name="location" size={14} color="green" />} value={distance} unit={'km'} isFirst={undefined} />
        </View>
    )
}

export default Stats


const styles = StyleSheet.create({
    container: {

        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    btnView: {
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 360,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    btnText: {
        fontSize: 12,
    }


})