import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BmiModal from '../components/bmiScreen/BmiModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeChange } from '../apptheme/ThemeChange';
import { AppContext } from '../contextApi/AppContext';
const Profile = ({ currentType, setShowOverLay, showOverLay }: any) => {

    const genderArray = 'male,female,other'.split(',');
    const ageArray = Array.from({ length: 200 }, (_, index) => index + 1);
    const [defaultIndex, setDefaultIndex] = useState({
        gender: 0,
        age: 0,
        height: 0,
        weight: 0
    })
    const useCustomTheme = useThemeChange()
    const { userData, setUserData }: any = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')

    const toggleModal = (e: any) => {
        setModalVisible(!modalVisible)
        setShowOverLay(!showOverLay)
        setTitle(e)
    }

    useEffect(() => {
        setDefaultIndex({
            gender: genderArray.indexOf(userData.gender),
            age: ageArray.indexOf(Number(userData.age)),
            height: ageArray.indexOf(Number(userData.height)),
            weight: ageArray.indexOf(Number(userData.weight))
        })
    }, [userData])


    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header, borderRadius: 10, }}>
            <BmiModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={title}
                userData={userData}
                setUserData={setUserData}
                currentType={currentType}
                setShowOverLay={setShowOverLay}
                showOverLay={showOverLay}
                genderArray={genderArray}
                ageArray={ageArray}
                defaultIndex={defaultIndex}
                setDefaultIndex={setDefaultIndex}
            />
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Gender</Text>
                <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Gender')}>
                    <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey' }}>{userData.gender}</Text>
                    <AntDesign name="down" size={14} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Age</Text>
                <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Age')}>
                    <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey' }}>{userData.age} years old</Text>
                    <AntDesign name="down" size={14} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Height</Text>
                <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Height')}>
                    <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey' }}>{userData.height} cm</Text>
                    <AntDesign name="down" size={14} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Weight</Text>
                <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Weight')}>
                    <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey' }}>{userData.weight} Kg</Text>
                    <AntDesign name="down" size={14} color="grey" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    btnText: {
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    rowText: {
        fontWeight: 'bold',
    },
})