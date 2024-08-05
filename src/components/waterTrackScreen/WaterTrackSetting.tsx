import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Row from './Row'
import SetDrinkTarget from './SetDrinkTarget'
import { AppContext } from '../../contextApi/AppContext'
import { useIsFocused } from '@react-navigation/native';

const WaterTrackSetting = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const drinkGaolData: any = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
    const cupcapacitydata: any = [50, 100, 150, 200, 250, 300]
    const { drinkGoal, setDrinkGoal, cupCapacity, setCupCapacity, waterdrinked, setwaterdrinked, IsgoalAchieved,
        setISgoalAchieved } = route.params;
    const isFocused = useIsFocused();
    const [localDrinkGoal, setLocalDrinkGoal] = useState(route.params.drinkGoal);
    const [localCupCapacity, setLocalCupCapacity] = useState(route.params.cupCapacity);
    const [defaultIndexcup, setDefaultIndexcup] = useState(0)
    const [defaultIndexgoal, setDefaultIndexgoal] = useState(0)
    const {
        modalType,
        setModalType

    }: any = useContext(AppContext)
    useEffect(() => {
        if (isFocused) {
            setLocalDrinkGoal(route.params.drinkGoal);
            setLocalCupCapacity(route.params.cupCapacity);
        }
    }, [isFocused, route.params.drinkGoal, route.params.cupCapacity]);

    useEffect(() => {
        setDefaultIndexcup(cupcapacitydata.indexOf(localCupCapacity))
        setDefaultIndexgoal(drinkGaolData.indexOf(localDrinkGoal))
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
        <>
            <Header />
            <View style={styles.container}>
                <SetDrinkTarget
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    drinkGoal={drinkGoal}
                    setDrinkGoal={(value) => {
                        setLocalDrinkGoal(value);
                        setDrinkGoal(value);
                    }}
                    cupCapacity={localCupCapacity}
                    setCupCapacity={(value) => {
                        setLocalCupCapacity(value);
                        setCupCapacity(value);
                    }}
                    waterdrinked={route.params.waterdrinked}
                    setwaterdrinked={route.params.setwaterdrinked}
                    IsgoalAchieved={route.params.IsgoalAchieved}
                    setISgoalAchieved={setISgoalAchieved}
                    drinkGaolData={drinkGaolData}
                    cupcapacitydata={cupcapacitydata}
                    defaultIndexcup={defaultIndexcup}
                    setDefaultIndexcup={setDefaultIndexcup}
                    defaultIndexgoal={defaultIndexgoal}
                    setDefaultIndexgoal={setDefaultIndexgoal}
                />
                <Row title={"Unit"} onpress={unitHandler} subtil={''} />
                <Row title={"Cup Capacity"} subtil={localCupCapacity} onpress={cupcapacityHandler} />
                <Row title={"Drink Goal"} subtil={localDrinkGoal} onpress={drinkgoalhandler} />
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