import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Image, Dimensions } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useThemeChange } from '../../apptheme/ThemeChange';
import Wave from "react-native-waves"
import { WaterWave } from './WaterWave';
const { width } = Dimensions.get('window');




const ProgressCircle = ({
    drinkGoal,
    setDrinkGoal,
    cupCapacity,
    setCupCapacity,
    waterdrinked,
    setwaterdrinked,
    IsgoalAchieved,
    setISgoalAchieved,
    currentType
}: any) => {
    const {
        MAX_HEIGHT,
        setNoOfCups,
        preWaterCount,
        fillcontainer,
        setFillContainer,
    }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [cupHeight, setCupHeight] = useState(0)


    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [today, setToday] = useState(dateOnly)
    const { getALLWaterData, updateWaterRecord, insertWaterData, getWaterData } = useDatabase()
    const waveOffset = useSharedValue(0)

    const waveAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: waveOffset.value }],
        };
    });

    useEffect(() => {
        waveOffset.value = withRepeat(
            withTiming(-width, { duration: 2000 }),
            -1,
            true
        );
    }, []);


    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP

        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)

        if (waterdrinked >= drinkGoal) {
            console.log("waterdrinked >= drinkGoal", waterdrinked, drinkGoal)
            setISgoalAchieved(true)
        }

    }, [])




    useEffect(() => {
        if (IsgoalAchieved) {
            setBolFlag(true);
        }
    }, [IsgoalAchieved])



    useEffect(() => {

        if (bolflag) {
            console.log('sasa')
            setBolFlag(false)
            return
        }


        console.log("fillContainer", fillcontainer + cupHeight)
        if (fillcontainer + cupHeight >= MAX_HEIGHT) {
            setFillContainer(MAX_HEIGHT)
            setISgoalAchieved(true)
        }
        else {
            setFillContainer((pre: number) => (pre + cupHeight))
        }

        return () => {

        }

    }, [waterdrinked])

    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP
        if (drinkflag) {
            setDrinkFlag(false)
            return
        }
        let NO_OF_CUPS = drinkGoal / cupCapacity
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)
        let p = (preWaterCount / drinkGoal) * 100
        let preHeight = (p * MAX_HEIGHT) / 100
        setFillContainer(preHeight)
    }, [drinkGoal])


    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP
        let NO_OF_CUPS = drinkGoal / cupCapacity
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)
        setNoOfCups(NO_OF_CUPS)

    }, [cupCapacity])

    return (
        // <View style={{ ...styles.container, height: MAX_HEIGHT, borderColor: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke }}>
        //     <Image
        //         source={require('../../../assets/waterTrackScreenAssets/water_icon.png')}
        //         style={{ height: 100, width: 100 }}
        //     />
        //     <View style={{ ...styles.fillingContainer, height: fillcontainer || 0, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke }}>
        //     {/* <Animated.View style={[styles.ave, waveAnimation]} /> */}
        //     </View>
        //     {/* <Wave delta={1} maxPoints={1} placement="bottom" height={fillcontainer || 0} color={currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke} /> */}
        // </View>
        <WaterWave size={200} value={fillcontainer} currentType={currentType}/>
    );
};

export default ProgressCircle;

const styles = StyleSheet.create({
    container: {
        width: 200,
        borderWidth: 5,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center'
    },
    fillingContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    wave: {
        width: '200%', // Double the width for seamless animation
        height: '100%',
        backgroundColor: '#9f49ff',
        borderRadius: 100,
    },
});
