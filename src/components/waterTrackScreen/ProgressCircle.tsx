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
    }: any = useContext(AppContext)
    const [fillcontainer, setFillContainer] = useState(0)
    const [bolflag, setBolFlag] = useState(true)
    const [drinkflag, setDrinkFlag] = useState(true)
    const [capacityflag, setCapacityFlag] = useState(true)
    const isFocused = useIsFocused();



    useEffect(() => {

        if (bolflag) {
            setBolFlag(false)
            return
        }
        let HEIGHT_ON_EVERY_CUP

        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        console.log('h', NO_OF_CUPS)
        console.log('fillonEachCup', HEIGHT_ON_EVERY_CUP)
        if (fillcontainer + HEIGHT_ON_EVERY_CUP > MAX_HEIGHT) {
            setFillContainer(MAX_HEIGHT)
        }
        else {
            setFillContainer((pre) => pre + HEIGHT_ON_EVERY_CUP)
        }
        console.log('fillcontainer', fillcontainer + HEIGHT_ON_EVERY_CUP)

        return () => {

        }

    }, [waterdrinked])

    useEffect(() => {

        if (drinkflag) {
            setDrinkFlag(false)
            return
        }
        let NO_OF_CUPS = drinkGoal / cupCapacity
        setNoOfCups(NO_OF_CUPS)
        console.log('pre', preCupCount)
        let HEIGHT_ON_EVERY_CUP
        HEIGHT_ON_EVERY_CUP = MAX_HEIGHT / NO_OF_CUPS
        let HEIGHT_FROM_PREVOIUS_TARGET = HEIGHT_ON_EVERY_CUP * preCupCount
        console.log('HEIGHT_FROM_PREVOIUS_TARGET', HEIGHT_FROM_PREVOIUS_TARGET)
        setFillContainer(HEIGHT_FROM_PREVOIUS_TARGET)
        console.log('When Drink Goal Change Water IN EVERY CUP', HEIGHT_ON_EVERY_CUP)
        console.log(fillcontainer)

    }, [drinkGoal])

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
