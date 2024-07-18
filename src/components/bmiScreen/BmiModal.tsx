import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const BmiModal = ({ modalVisible, setModalVisible, title, userData, setUserData }) => {
    const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');
    const gender = 'male,female,other'.split(',');
    const ageArray = Array.from({ length: 200 }, (_, index) => index + 1);
    const [defaultIndex, setDefaultIndex] = useState({
        gender: 0,
        age: 22,
        height: 169,
        weight: 69
    })
    const [obj, setObj] = useState<any>({})

    const saveChanges = () => {
        if (title === 'Gender') {
            setUserData((pre) => ({ ...pre, gender: obj.gender }));
            setDefaultIndex((pre) => ({ ...pre, gender: obj.gindex }));
        } else if (title === 'Age') {
            setUserData((pre) => ({ ...pre, age: obj.age }));
            setDefaultIndex((pre) => ({ ...pre, age: obj.aindex }));
        } else if (title === 'Height') {
            setUserData((pre) => ({ ...pre, height: obj.height }));
            setDefaultIndex((pre) => ({ ...pre, height: obj.hindex }));
        } else {
            setUserData((pre) => ({ ...pre, weight: obj.weight }));
            setDefaultIndex((pre) => ({ ...pre, weight: obj.windex }));
        }


        setModalVisible(!modalVisible)
    }


    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textHeading}>{title}</Text>
                        <WheelPickerExpo
                            height={150}
                            width={150}
                            initialSelectedIndex={title === 'Gender' ?
                                defaultIndex.gender : title === 'Age' ?
                                    defaultIndex.age : title === 'Height' ?
                                        defaultIndex.height : defaultIndex.weight}
                            items={
                                title === 'Gender' ?
                                    gender.map(name => ({ label: name, value: '' }))
                                    : ageArray.map(name => ({ label: String(name), value: '' }))
                            }
                            onChange={
                                ({ item, index }) => {
                                    if (title === 'Gender') {
                                        setObj((pre) => ({ ...pre, gender: item.label, gindex: index }));
                                    } else if (title === 'Age') {
                                        setObj((pre) => ({ ...pre, age: item.label, aindex: index }));
                                    } else if (title === 'Height') {
                                        setObj((pre) => ({ ...pre, height: item.label, hindex: index }));
                                    } else {
                                        setObj((pre) => ({ ...pre, weight: item.label, windex: index }));
                                    }
                                }

                            }
                            selectedStyle={{ borderColor: '#0cf249', borderWidth: 1 }}
                        />
                        <Pressable
                            style={[styles.button]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: '#0cf249',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    // buttonOpen: {
    //     backgroundColor: '#F194FF',
    // },
    buttonClose: {
        backgroundColor: '#fffff',
        color: '#000000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
});

export default BmiModal;