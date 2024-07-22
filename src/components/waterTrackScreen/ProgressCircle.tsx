import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { AppContext } from '../../contextApi/AppContext';



const ProgressCircle = () => {
    const {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        MAX_HEIGHT,
        waterdrinked,
        setwaterdrinked,
    }: any = useContext(AppContext)
    const [fillcontainer, setFillContainer] = useState(0)
    const [bolflag , setBolFlag] = useState(true)


    useEffect(() => {

        if(bolflag){
            setBolFlag(false)
            return
        }
        let fillonEachCup

        let h = drinkGoal / cupCapacity
        fillonEachCup = MAX_HEIGHT / h
        console.log('h', h)
        console.log('fillonEachCup', fillonEachCup)
        setFillContainer(fillcontainer + fillonEachCup)
        console.log(fillcontainer)


    }, [drinkGoal, cupCapacity, waterdrinked])

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
