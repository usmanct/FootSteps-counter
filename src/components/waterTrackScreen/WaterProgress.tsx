import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ProgressCircle from './ProgressCircle';
import { AppContext } from '../../contextApi/AppContext';
import SetDrinkTarget from './SetDrinkTarget';
import { useNavigation } from '@react-navigation/native';



const WaterProgress = () => {
    const {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        MAX_HEIGHT,
        waterdrinked,
        setwaterdrinked,
        IsgoalAchieved,
        setISgoalAchieved,
    }: any = useContext(AppContext)
    const navigation = useNavigation();


    useEffect(() => {
        let per
        per = waterdrinked / drinkGoal * 100
        setPercentageDrinked(per.toFixed(2))

    }, [waterdrinked , drinkGoal])
    useEffect(() => {

    }, [])
    useEffect(() => {

    }, [])


    useEffect(() => {

    }, [])

    const [precentageDrinked, setPercentageDrinked] = useState(0.0)

    const handleDrink = () => {
        if (waterdrinked < drinkGoal) {
            setwaterdrinked(waterdrinked + cupCapacity)
        }
        else {
            setISgoalAchieved(true)
        }
    }
    const navigateToSetting = () => {
        navigation.navigate('WaterTrackSetting' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.btnView}>
                <TouchableOpacity
                    onPress={navigateToSetting}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>edit</Text>
                    <AntDesign name="right" size={12} color="black" />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.innerContainer}> */}
            <ProgressCircle />
            <Text style={styles.pageText}>{precentageDrinked}%</Text>
            <Text>{waterdrinked}/{drinkGoal}ml</Text>
            <View>
                <TouchableOpacity
                    style={{ ...styles.drinkBtn, backgroundColor: IsgoalAchieved ? 'gray' : '#0cf249', }}
                    onPress={handleDrink}
                    disabled={IsgoalAchieved}
                >
                    <Text style={styles.textStyle}>Drink</Text>
                </TouchableOpacity>
            </View>
            {/* </View> */}
        </View>
    )
}

export default WaterProgress

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
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
    },
    pageText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    drinkBtn: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})