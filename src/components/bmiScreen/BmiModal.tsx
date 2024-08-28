import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const BmiModal = ({ modalVisible, setModalVisible, title, userData, setUserData } : any) => {
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
            setUserData((pre: any) => ({ ...pre, gender: obj.gender }));
            setDefaultIndex((pre) => ({ ...pre, gender: obj.gindex }));
        } else if (title === 'Age') {
            setUserData((pre: any) => ({ ...pre, age: obj.age }));
            setDefaultIndex((pre) => ({ ...pre, age: obj.aindex }));
        } else if (title === 'Height') {
            setUserData((pre: any) => ({ ...pre, height: obj.height }));
            setDefaultIndex((pre) => ({ ...pre, height: obj.hindex }));
        } else {
            setUserData((pre: any) => ({ ...pre, weight: obj.weight }));
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
                                        setObj((pre: any) => ({ ...pre, gender: item.label, gindex: index }));
                                    } else if (title === 'Age') {
                                        setObj((pre: any) => ({ ...pre, age: item.label, aindex: index }));
                                    } else if (title === 'Height') {
                                        setObj((pre: any) => ({ ...pre, height: item.label, hindex: index }));
                                    } else {
                                        setObj((pre: any) => ({ ...pre, weight: item.label, windex: index }));
                                    }
                                }

                            }
                            selectedStyle={styles.selectedItem}
                        />
                        <Pressable
                            style={[styles.button , styles.saveBtn]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button , styles.cancelBtn]}
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
        backgroundColor: '#f49913',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
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
    saveBtn: {
        backgroundColor: '#f49913',
    },
    cancelBtn: {
        backgroundColor: '#0fb4fc',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 10,
        fontSize: 16,
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: '#fc5c74',
        color: '#0cf249',
        fontWeight: 'bold',
    }
});

export default BmiModal;