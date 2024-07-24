import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import { useIsFocused } from '@react-navigation/native';
import DataBaseInitialization from '../../sqLiteDb/DataBaseInitialization';
import { useDatabase } from '../../sqLiteDb/useDatabase';




const ProgressCircle = () => {
    const {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        MAX_HEIGHT,
        waterdrinked,
        setwaterdrinked,
        preCupCount,
        setPreCupCount,
        noOfCups,
        setNoOfCups,
        modalType,
        setModalType,
        preWaterCount,
        setWaterCupCount,
        waterState,
        setWaterState,
        IsCupfilllied,
        setIsCupfilllied,
        IsgoalAchieved,
        setISgoalAchieved,
    }: any = useContext(AppContext)

    const { insertWaterData } = useDatabase();

    const [fillcontainer, setFillContainer] = useState(0)
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [capacityflag, setCapacityFlag] = useState(true)
    const isFocused = useIsFocused();
    const [cupHeight, setCupHeight] = useState(0)

    const now = new Date();
    const dateOnly = now.toLocaleDateString();

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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newNow = new Date();
    //         const newDateOnly = newNow.toLocaleDateString();
    //         if (newDateOnly !== dateOnly) {
    //             insertWaterData().then(() => {
    //                 console.log('Data inserted successfully');
    //             }).catch(error => {
    //                 console.error('Error inserting data:', error);
    //             });
    //             waterdrinked(0); // Reset the steps for the new day
    //         }
    //     }, 60000); // Check every minute

    //     return () => clearInterval(interval); // Clean up the interval on unmount
    // }, [dateOnly]);


    useEffect(() => {
        if (IsgoalAchieved) {
            insertWaterData().then(() => {
                console.log('Data inserted successfully');
            }).catch(error => {
                console.error('Error inserting data:', error);
            });
            setwaterdrinked(0);
            setFillContainer(0)
            setISgoalAchieved(false)
            setBolFlag(true);
        }
    },
        [IsgoalAchieved])

    useEffect(() => {

        if (bolflag) {
            setBolFlag(false)
            return
        }
        if (fillcontainer + cupHeight >= MAX_HEIGHT) {
            setFillContainer(MAX_HEIGHT)
            setISgoalAchieved(true)
        }
        else {
            console.log("dd")
            setFillContainer((pre) => (pre + cupHeight))
        }
        console.log('fillcontainer', fillcontainer)

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
        console.log("preWaterCount", preWaterCount)
        let p = (preWaterCount / drinkGoal) * 100

        let preHeight = (p * MAX_HEIGHT) / 100

        setFillContainer(preHeight)
        console.log('When Drink Goal Change Water IN EVERY CUP', HEIGHT_ON_EVERY_CUP)
        console.log(fillcontainer)

    }, [drinkGoal])


    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP

        let req = drinkGoal - waterdrinked

        let NO_OF_CUPS = drinkGoal / cupCapacity
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)

        console.log('NoOfCUPS', NO_OF_CUPS)
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
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 5,
        // position: 'relative',
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
