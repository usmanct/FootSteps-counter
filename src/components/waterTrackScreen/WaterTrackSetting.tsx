import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Row from './Row'
import SetDrinkTarget from './SetDrinkTarget'
import { AppContext } from '../../contextApi/AppContext'

const WaterTrackSetting = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('')
    
    const {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        IsgoalAchieved,
        setISgoalAchieved
    }: any = useContext(AppContext)
    
        useEffect(()=>{
            setISgoalAchieved(false)
        },[drinkGoal])
    
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
                <SetDrinkTarget modalVisible={modalVisible} setModalVisible={setModalVisible} modalType={modalType} setModalType={setModalType} />
                <Row title={"Unit"} onpress={unitHandler} />
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