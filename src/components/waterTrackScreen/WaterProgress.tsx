import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ProgressCircle from './ProgressCircle';
import { AppContext } from '../../contextApi/AppContext';;
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import { useIsFocused } from '@react-navigation/native';
import { useThemeChange } from '../../apptheme/ThemeChange';


const WaterProgress = (
    {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        waterdrinked,
        setwaterdrinked,
        IsgoalAchieved,
        setISgoalAchieved,
        currentType,
        setShowOverLay,
        showOverLay,
        setMeasuringUnit,
        measuringUnit
    }: any) => {
    const {
        MAX_HEIGHT,
        fillcontainer,
        setFillContainer,
    }: any = useContext(AppContext)
    const isFocused = useIsFocused();
    const useCustomTheme = useThemeChange()
    const now = new Date()
    const dateOnly = now.toLocaleDateString();
    const [waterdrinkFlag, setWaterDrinkFlag] = useState(false)
    const navigation = useNavigation();
    const { dropTable, getWaterData } = useDatabase()
    useEffect(() => {
        if (drinkGoal <= waterdrinked) {
            setISgoalAchieved(true)

        }
        setTimeout(() => {
            setWaterDrinkFlag(false)
        }, 4000)
    }, [isFocused, waterdrinkFlag])

    useEffect(() => {
        if (drinkGoal <= waterdrinked && waterdrinkFlag) {
            setShowOverLay(true)
        }
    }, [waterdrinked])

    useEffect(() => {
        let per : any
        per = waterdrinked / drinkGoal * 100
        setPercentageDrinked(per.toFixed(2))
        const prefill = waterdrinked / drinkGoal * 100
        let preHeight = (prefill * MAX_HEIGHT) / 100
        setFillContainer(preHeight)

    }, [waterdrinked, drinkGoal, cupCapacity])

    const [precentageDrinked, setPercentageDrinked] = useState(0.0)

    const handleDrink = () => {
        if (!IsgoalAchieved) {
            setwaterdrinked(waterdrinked + cupCapacity)
            setWaterDrinkFlag(true)
        }

    }
    const navigateToSetting = () => {
        navigation.navigate('WaterTrackSetting', {
            drinkGoal,
            setDrinkGoal,
            cupCapacity,
            setCupCapacity,
            waterdrinked,
            setwaterdrinked,
            IsgoalAchieved,
            setISgoalAchieved,
            setMeasuringUnit,
            measuringUnit
        } as never)
    }

    return (
        <>
            <ImageBackground
                source={require('../../../assets/homeScreenAssets/back_ground.png')}
                style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : useCustomTheme.lightMode.bgcolor }}
                resizeMode="cover" // You can also use "contain" or other modes depending on the effect you want
            >
                <View style={styles.btnView}>
                    <TouchableOpacity
                        onPress={navigateToSetting}
                        style={{ ...styles.btn, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.lightMode.Btn1 }}
                    >
                        <Text style={styles.btnText}>Edit</Text>
                        <AntDesign name="right" size={14} color="white" />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.innerContainer}> */}
                <ProgressCircle
                    drinkGoal={drinkGoal}
                    setDrinkGoal={setDrinkGoal}
                    cupCapacity={cupCapacity}
                    setCupCapacity={setCupCapacity}
                    waterdrinked={waterdrinked}
                    setwaterdrinked={setwaterdrinked}
                    IsgoalAchieved={IsgoalAchieved}
                    setISgoalAchieved={setISgoalAchieved}
                    currentType={currentType}
                />
                {/* </View> */}
            </ImageBackground>
            <View style={[styles.container, styles.resultContainer, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }]}>
                <TouchableOpacity onPress={() => dropTable()}>
                    <Text style={{ ...styles.pageText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{precentageDrinked}%</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.Text }}>{waterdrinked}/{drinkGoal} {measuringUnit}</Text>
                <View>
                    <TouchableOpacity
                        style={{ ...styles.drinkBtn, backgroundColor: IsgoalAchieved || waterdrinkFlag ? 'gray' : '#0fb4fc', }}
                        onPress={handleDrink}
                        disabled={IsgoalAchieved || waterdrinkFlag}
                    >
                        {waterdrinkFlag
                            ?
                            <Text style={styles.textStyle}>Drinking....</Text> :
                            <Text style={styles.textStyle}>Drink</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default WaterProgress

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // margin: 10,
        paddingVertical: 15,
        // borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,

    },
    resultContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
        gap: 5
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
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f59207'
    },
    btnText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    pageText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    drinkBtn: {
        backgroundColor: '#f49913',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
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