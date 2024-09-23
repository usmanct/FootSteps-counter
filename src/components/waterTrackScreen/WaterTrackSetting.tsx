import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Row from './Row'
import SetDrinkTarget from './SetDrinkTarget'
import { AppContext } from '../../contextApi/AppContext'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeChange } from '../../apptheme/ThemeChange'
import OverLayScreen from '../OverLayScreen'

const WaterTrackSetting = ({ route }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const drinkGaolData: any = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
    const cupcapacitydata: any = [50, 100, 150, 200, 250, 300]
    const unitData: any = ['ml', 'oz']
    const { drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        waterdrinked,
        setwaterdrinked,
        IsgoalAchieved,
        setISgoalAchieved,
        setMeasuringUnit,
        measuringUnit
    } = route.params;
    const isFocused = useIsFocused();
    const [localDrinkGoal, setLocalDrinkGoal] = useState(route.params.drinkGoal);
    const [localCupCapacity, setLocalCupCapacity] = useState(route.params.cupCapacity)
    const [localMeasuringUnit, setLocalMeasuringUnit] = useState<any>(route.params.measuringUnit)
    const [defaultIndexcup, setDefaultIndexcup] = useState(0)
    const [defaultIndexgoal, setDefaultIndexgoal] = useState(0)
    const [defaultUnitIndex, setDefaultUnitIndex] = useState(0)
    const {
        modalType,
        setModalType,
        currentType
    }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
            setLocalDrinkGoal(route.params.drinkGoal);
            setLocalCupCapacity(route.params.cupCapacity);
            setLocalMeasuringUnit(route.params.measuringUnit);
        }
    }, [isFocused, route.params.drinkGoal, route.params.cupCapacity, route.params.measuringUnit]);

    useEffect(() => {
        setDefaultIndexcup(cupcapacitydata.indexOf(localCupCapacity))
        setDefaultIndexgoal(drinkGaolData.indexOf(localDrinkGoal))
        setDefaultUnitIndex(unitData.indexOf(localMeasuringUnit))
    }, [])
    useEffect(() => {
        setISgoalAchieved(false);
    }, [localDrinkGoal, localCupCapacity]);

    const unitHandler = () => {
        setModalVisible(!modalVisible)
        setModalType('unit')
    }
    const cupcapacityHandler = () => {
        setModalVisible(!modalVisible)
        setModalType('cupcapacity')
    }
    const drinkgoalhandler = () => {
        setModalVisible(!modalVisible)
        setModalType('drinkgoal')
    }

    return (
        <View style={{ backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white', flex: 1 }}>
            {/* BlurView and Overlay when modal is visible */}
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="keyboard-backspace" size={24} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text} />
                </TouchableOpacity>
                <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Results</Text>
            </View>
            <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
                <Row title={"Unit"} onpress={unitHandler} subtil={localMeasuringUnit} currentType={currentType} measuringUnit={measuringUnit} />
                <Row title={"Cup Capacity"} subtil={localCupCapacity} onpress={cupcapacityHandler} currentType={currentType} measuringUnit={measuringUnit} />
                <Row title={"Drink Goal"} subtil={localDrinkGoal} onpress={drinkgoalhandler} currentType={currentType} measuringUnit={measuringUnit} />
            </View>
            <SetDrinkTarget
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                drinkGoal={drinkGoal}
                setDrinkGoal={(value: any) => {
                    setLocalDrinkGoal(value);
                    setDrinkGoal(value);
                }}
                cupCapacity={localCupCapacity}
                setCupCapacity={(value: any) => {
                    setLocalCupCapacity(value);
                    setCupCapacity(value);
                }}
                waterdrinked={route.params.waterdrinked}
                setwaterdrinked={route.params.setwaterdrinked}
                IsgoalAchieved={route.params.IsgoalAchieved}
                setISgoalAchieved={setISgoalAchieved}
                drinkGaolData={drinkGaolData}
                cupcapacitydata={cupcapacitydata}
                unitData={unitData}
                defaultIndexcup={defaultIndexcup}
                setDefaultIndexcup={setDefaultIndexcup}
                setDefaultUnitIndex={setDefaultUnitIndex}
                defaultIndexgoal={defaultIndexgoal}
                defaultUnitIndex={defaultUnitIndex}
                setDefaultIndexgoal={setDefaultIndexgoal}
                currentType={currentType}
                measuringUnit={measuringUnit}
                setMeasuringUnit={(value: any) => {
                    setMeasuringUnit(value);
                    setLocalMeasuringUnit(value);
                }}
            />
            <OverLayScreen modalVisible={modalVisible} />
        </View>
    )
}

export default WaterTrackSetting

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    darkeroverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)', // Adjust opacity for a darker overlay
    },
    brightoverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white overlay with low opacity for dark mode
    },
    backButton: {
        position: 'absolute',
        left: 10, // Adjust to fit your layout
        justifyContent: 'center',
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});
