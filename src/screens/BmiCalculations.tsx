import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BmiModal from '../components/bmiScreen/BmiModal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../contextApi/AppContext';
import { useThemeChange } from '../apptheme/ThemeChange';
import OverLayScreen from '../components/OverLayScreen';

const BmiCalculations = () => {
    const navigation = useNavigation();
    const [bmivalue, setBmiValue] = useState<any>()
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [showOverLay, setShowOverLay] = useState(false)
    const genderArray = 'male,female,other'.split(',');
    const ageArray = Array.from({ length: 200 }, (_, index) => index + 1);
    const [defaultIndex, setDefaultIndex] = useState({
        gender: 0,
        age: 0,
        height: 0,
        weight: 0
    })


    const { currentType, userData, setUserData }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()



    // useEffect(() => {
    //     initialLoad()
    // }, [])

    const calculateBMI = async () => {
        const heightM = parseFloat(userData.height) / 100;
        const widthM = parseFloat(userData.weight)
        const res = (widthM / (heightM * heightM)).toFixed(2);
        setBmiValue(res)
        navigation.navigate('BmiResult', { res })
    }

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
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
            <Image
                source={require('../../assets/homeScreenAssets/bmi_calculate_icon.png')}
                style={{ height: 90, width: 90 }}
                resizeMode='contain'
            />
            <Text style={{ ...styles.heading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>BMI Calculations</Text>
            <Text style={styles.subHeading}>Set your  Personal Information to calculate</Text>
            <View style={{ ...styles.subContainer, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
                <View style={styles.row}>
                    <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Gender</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Gender')}>
                        <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{userData.gender}</Text>
                        <AntDesign name="down" size={14} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Age</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Age')}>
                        <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{userData.age} years old</Text>
                        <AntDesign name="down" size={14} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Height</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Height')}>
                        <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{userData.height} cm</Text>
                        <AntDesign name="down" size={14} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Weight</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Weight')}>
                        <Text style={{ ...styles.btnText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{userData.weight} Kg</Text>
                        <AntDesign name="down" size={14} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={calculateBMI}
                >
                    <Text style={styles.resultBtnText}>Calculate</Text>
                </TouchableOpacity>
            </View>
            <OverLayScreen showOverLay={showOverLay} />
            <BmiModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={title}
                userData={userData}
                setUserData={setUserData}
                currentType={currentType}
                showOverLay={showOverLay}
                setShowOverLay={setShowOverLay}
                genderArray={genderArray}
                ageArray={ageArray}
                defaultIndex={defaultIndex}
                setDefaultIndex={setDefaultIndex}
            />
        </View>
    )
}

export default BmiCalculations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',

    },
    subContainer: {
        borderRadius: 10,
        margin: 10,
        width: '100%',
        padding: 20,
    },
    heading: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 20,
        marginBottom: 20,
        color: 'grey',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    btnText: {
        fontSize: 14,
        color: 'grey',
    },
    rowText: {
        fontWeight: 'bold',
    },
    resultBtn: {
        backgroundColor: '#06bcfa',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    resultBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }




})