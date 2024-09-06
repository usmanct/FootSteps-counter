import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BmiModal from '../components/bmiScreen/BmiModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeChange } from '../apptheme/ThemeChange';
const Profile = ({ currentType, setShowOverLay, showOverLay }: any) => {



    const [userData, setUserData] = useState({
        gender: 'male',
        age: '23',
        height: '170',
        weight: '70',

    })
    const useCustomTheme = useThemeChange()

    useEffect(() => {
        initialLoad()
    }, [])


    const initialLoad = async () => {
        try {
            const res = await AsyncStorage.getItem('userData');
            if (res) {
                const userData = JSON.parse(res);
                setUserData(userData); // Update the state with the retrieved data
            }
        } catch (error) {
            console.error('Failed to load user data', error);
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')

    const toggleModal = (e: any) => {
        setModalVisible(!modalVisible)
        setShowOverLay(!showOverLay)
        setTitle(e)
    }


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