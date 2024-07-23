import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';
import { useIsFocused } from '@react-navigation/native';



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
    }: any = useContext(AppContext)
    const [fillcontainer, setFillContainer] = useState(0)
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [capacityflag, setCapacityFlag] = useState(true)
    const isFocused = useIsFocused();
    const [cupHeight, setCupHeight] = useState(0)


    useEffect(() => {
        let HEIGHT_ON_EVERY_CUP

        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        setCupHeight(HEIGHT_ON_EVERY_CUP)
    }, [])


    useEffect(() => {

        if (bolflag) {
            setBolFlag(false)
            return
        }
        if (fillcontainer + cupHeight > MAX_HEIGHT) {
            setFillContainer(MAX_HEIGHT)
        }
        else {
            setFillContainer((pre) => pre + cupHeight)
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
            <View style={{ ...styles.fillingContainer, height: fillcontainer }}></View>
        </View>
    );
};

export default ProgressCircle;

const styles = StyleSheet.create({
    container: {
        width: 200,
        borderColor: '#0cf249',
        borderWidth: 2,
        borderTopWidth: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 5,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fillingContainer: {
        width: '100%',
        backgroundColor: '#0cf249',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    }
});
