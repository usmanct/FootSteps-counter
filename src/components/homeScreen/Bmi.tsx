import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Bmi = () => {
    const navigation = useNavigation();
    const navigateToBMI = () => {
        navigation.navigate('BmiCalculations' as never)
    }

    return (
        <View style={styles.maincontainer}>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Watch ads</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Ionicons name="body" size={24} color="white" />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>BMI calculate</Text>
                <TouchableOpacity onPress={navigateToBMI}>
                    <AntDesign name="right" size={25} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Bmi

const styles = StyleSheet.create({
    maincontainer: {
        backgroundColor: '#0cf249',
        margin: 10,
        marginTop: 5,
        borderRadius: 8,
        gap: 15,
        // paddingHorizontal: 10,
    },
    container: {

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginTop: 5,
        paddingVertical: 25,
        gap: 15,
        paddingHorizontal: 10,
    },
    btnView: {
        justifyContent: 'flex-end',
        // backgroundColor: 'lightgreen',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        backgroundColor: 'orange',
        borderTopRightRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 3,

    },
    btnText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    }


})