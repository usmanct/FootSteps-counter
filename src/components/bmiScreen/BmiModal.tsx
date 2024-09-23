import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useThemeChange } from '../../apptheme/ThemeChange';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BmiModal = ({ modalVisible, setModalVisible, title, userData, setUserData, currentType, showOverLay, setShowOverLay }: any) => {
    const gender = 'male,female,other'.split(',');
    const ageArray = Array.from({ length: 200 }, (_, index) => index + 1);
    const [defaultIndex, setDefaultIndex] = useState({
        gender: 0,
        age: 22,
        height: 169,
        weight: 69
    })
    const [obj, setObj] = useState<any>({})
    const usecustomTheme = useThemeChange()

    const saveChanges = async () => {
        let updatedData = { ...userData };

        if (title === 'Gender') {
            updatedData = { ...userData, gender: obj.gender };
            setDefaultIndex((prev) => ({ ...prev, gender: obj.gindex }));
        } else if (title === 'Age') {
            updatedData = { ...userData, age: obj.age };
            setDefaultIndex((prev) => ({ ...prev, age: obj.aindex }));
        } else if (title === 'Height') {
            updatedData = { ...userData, height: obj.height };
            setDefaultIndex((prev) => ({ ...prev, height: obj.hindex }));
        } else {
            updatedData = { ...userData, weight: obj.weight };
            setDefaultIndex((prev) => ({ ...prev, weight: obj.windex }));
        }

        setUserData(updatedData);

        // Save to localStorage
        await setLocalStorage(updatedData);

        setModalVisible(!modalVisible);
        setShowOverLay(!showOverLay);
    };
    useEffect(() => {
        console.log('Gender Default index' , defaultIndex );
    }, [])

    const setLocalStorage = async (data: any) => {
        console.log("Data", data)
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            console.log('User data saved!');
        } catch (error) {
            console.error('Failed to save user data', error);
        }
    };

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
                    <View style={{ ...styles.modalView, backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white' }}>
                        <Text style={{ color: currentType === 'dark' ? usecustomTheme.darkMode.Text : usecustomTheme.lightMode.Text }}>{title}</Text>
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
                            selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? usecustomTheme.darkMode.activeStroke : '#fc5c74' }}
                            backgroundColor={currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white'}
                        />
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.bmiButton : '#f49913' }]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Btn1 : '#0fb4fc' }]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                setShowOverLay(!showOverLay)
                            }}>
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
        flex: 1,
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
        color: '#0cf249',
        fontWeight: 'bold',
    }
});

export default BmiModal;