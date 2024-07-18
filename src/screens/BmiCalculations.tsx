import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BmiModal from '../components/bmiScreen/BmiModal';
import { useNavigation } from '@react-navigation/native';

const BmiCalculations = () => {
    const navigation = useNavigation();
    const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');
    const [bmivalue, setBmiValue] = useState<any>()
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')

    const [userData, setUserData] = useState({
        gender: 'male',
        age: '23',
        height: '170',
        weight: '70',

    })
    // function calculateBMI(weight, heightCm) {
        
    //   }
      
    //   // Example usage:
    //   const weight = 70; // weight in kilograms
    //   const heightCm = 175; // height in centimeters
    //   const bmi = calculateBMI(weight, heightCm);
    //   console.log(bmi); // Output: 22.857142857142858
      

    
    

    const calculateBMI = () => {
        const heightM = parseFloat(userData.height) / 100;
        const widthM = parseFloat(userData.weight)
        const res =  (widthM / (heightM * heightM)).toFixed(2);
        setBmiValue(res)
        navigation.navigate('BmiResult' , {res} )
    }

    const toggleModal = (e: any) => {
        setModalVisible(!modalVisible)
        setTitle(e)
    }

    const navigateToBMI = () => {

    }
    useEffect(() => {
        console.log(bmivalue)
    },[bmivalue])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>BMI Calculations</Text>
            <Text style={styles.subHeading}>Set your  Personal Information to calculate</Text>
            <BmiModal modalVisible={modalVisible} setModalVisible={setModalVisible} title={title} userData={userData} setUserData={setUserData} />
            <View style={styles.subContainer}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Gender</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Gender')}>
                        <Text style={styles.btnText}>{userData.gender}</Text>
                        <AntDesign name="down" size={14} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Age</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Age')}>
                        <Text style={styles.btnText}>{userData.age} years old</Text>
                        <AntDesign name="down" size={14} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Height</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Height')}>
                        <Text style={styles.btnText}>{userData.height} cm</Text>
                        <AntDesign name="down" size={14} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Weight</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => toggleModal('Weight')}>
                        <Text style={styles.btnText}>{userData.weight} Kg</Text>
                        <AntDesign name="down" size={14} color="grey" />
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

    },
    subContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 10,
        width: '100%',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 15,
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
        backgroundColor: '#0cf249',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
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
        fontSize: 16,
        fontWeight: 'bold',
    }




})