import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import DataBaseInitialization from '../../sqLiteDb/DataBaseInitialization';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProgressCircle = () => {
    const {
        drinkGoal,
        cupCapacity,
        MAX_HEIGHT,
        waterdrinked,
        setwaterdrinked,
        setNoOfCups,
        preWaterCount,
        setWaterState,
        IsgoalAchieved,
        setISgoalAchieved,
        waterState,
    }: any = useContext(AppContext)
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [cupHeight, setCupHeight] = useState(0)
    const [fillcontainer, setFillContainer] = useState(0)

    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [today, setToday] = useState(dateOnly)

    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP

        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)
        DataBaseInitialization()
    }, [])

 
    useEffect(() => {

        setWaterState((pre: any) => ({
            ...pre,
            date: dateOnly,
            waterIntake: waterdrinked,
            cupCapacity: cupCapacity,
            goal: drinkGoal
        }))
    }, [waterdrinked, cupCapacity, drinkGoal])


    useEffect(() => {
        if (IsgoalAchieved) {
            setwaterdrinked(0)
            setFillContainer(0)
            setISgoalAchieved(false)
            setBolFlag(true);
            console.log("waterState", waterState)
        }
    }, [IsgoalAchieved])



    useEffect(() => {

        if (bolflag) {
            setBolFlag(false)
            return
        }


        console.log("fillContainer", fillcontainer + cupHeight)
        if (fillcontainer + cupHeight >= MAX_HEIGHT) {
            setFillContainer(MAX_HEIGHT)
            setISgoalAchieved(true)
        }
        else {
            setFillContainer((pre) => (pre + cupHeight))
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
        <View style={{ ...styles.container, height: MAX_HEIGHT }}>
            <View style={{ ...styles.fillingContainer, height: fillcontainer }}>
            </View>
        </View>
    );
};

export default ProgressCircle;

const styles = StyleSheet.create({
    container: {
        width: 200,
        borderColor: '#0cf249',
        borderWidth: 2,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    fillingContainer: {
        width: '100%',
        backgroundColor: '#0cf249',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
});
