import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Row from './Row'
import SetDrinkTarget from './SetDrinkTarget'
import { AppContext } from '../../contextApi/AppContext'
import { useIsFocused } from '@react-navigation/native';

const WaterTrackSetting = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { drinkGoal, setDrinkGoal, cupCapacity, setCupCapacity, waterdrinked, setwaterdrinked, IsgoalAchieved,
        setISgoalAchieved } = route.params;
    const isFocused = useIsFocused();
    const {
        modalType,
        setModalType,
        noOfCups,
        setNoOfCups,
    }: any = useContext(AppContext)

    useEffect(() => {
        setISgoalAchieved(false)
    }, [drinkGoal, cupCapacity])


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
        <>
            <Header />
            <View style={styles.container}>
                <SetDrinkTarget
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    drinkGoal={drinkGoal}
                    setDrinkGoal={setDrinkGoal}
                    cupCapacity={cupCapacity}
                    setCupCapacity={setCupCapacity}
                    waterdrinked={waterdrinked}
                    setwaterdrinked={setwaterdrinked}
                    IsgoalAchieved={IsgoalAchieved}
                    setISgoalAchieved={setISgoalAchieved}
                />
                <Row title={"Unit"} onpress={unitHandler} subtil={''} />
                <Row title={"Cup Capacity"} subtil={cupCapacity} onpress={cupcapacityHandler} />
                <Row title={"Drink Goal"} subtil={drinkGoal} onpress={drinkgoalhandler} />
            </View>
        </>
    )
}

export default WaterTrackSetting

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
    row: {

    }
})