import { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import React from 'react';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { WaterWave } from './WaterWave';
const { width } = Dimensions.get('window');
const ProgressCircle = ({
    drinkGoal,
    cupCapacity,
    waterdrinked,
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
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [cupHeight, setCupHeight] = useState(0)
    const waveOffset = useSharedValue(0)
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
        <WaterWave size={200} value={fillcontainer} currentType={currentType} />
    );
};
export default ProgressCircle;
