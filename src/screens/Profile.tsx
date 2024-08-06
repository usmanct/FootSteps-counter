import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BmiModal from '../components/bmiScreen/BmiModal';
const Profile = () => {



    const [userData, setUserData] = useState({
        gender: 'male',
        age: '23',
        height: '170',
        weight: '70',

    })
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')

    const toggleModal = (e: any) => {
        setModalVisible(!modalVisible)
        setTitle(e)
    }


    return (
        <View style={styles.container}>
            <BmiModal modalVisible={modalVisible} setModalVisible={setModalVisible} title={title} userData={userData} setUserData={setUserData} />
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
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    rowText: {
        fontWeight: 'bold',
    },
})