import { StyleSheet, Image, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StatsCard from './StatsCard'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AppContext } from '../../contextApi/AppContext';

const Stats = ({ setCurrentStepCount, currentStepCount, kcal, setKcal, distance, setDistance }: any) => {
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
    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <View style={{...styles.container}}>
            <StatsCard
                icon={require('../../../assets/homeScreenAssets/distance_icon.png')}
                value={distance}
                unit={'Km'}
                isFirst={undefined}
            />
            <StatsCard
                isFirst={true}
                icon={require('../../../assets/homeScreenAssets/timer_icon.png')}
                value={formatTime(time)}
                unit={'Timer'}
            />
            <StatsCard
                icon={require('../../../assets/homeScreenAssets/calories_icon.png')}
                value={kcal} unit={'Kcal'}
                isFirst={undefined}
            />
        </View>
    )
}

export default Stats


const styles = StyleSheet.create({
    container: {

        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginVertical: 5,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 15,
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