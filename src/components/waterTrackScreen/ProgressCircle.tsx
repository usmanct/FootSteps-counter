import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import { useDatabase } from '../../sqLiteDb/useDatabase';



const ProgressCircle = () => {
    const {
        drinkGoal,
        cupCapacity,
        MAX_HEIGHT,
        waterdrinked,
        setwaterdrinked,
        setNoOfCups,
        preWaterCount,
        IsgoalAchieved,
        setISgoalAchieved,
        fillcontainer,
        setFillContainer,
        setDrinkGoal,
        setCupCapacity
    }: any = useContext(AppContext)
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [cupHeight, setCupHeight] = useState(0)


    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [today, setToday] = useState(dateOnly)
    const { getALLWaterData, updateWaterRecord, insertWaterData, getWaterData } = useDatabase()

    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP

        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)

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
