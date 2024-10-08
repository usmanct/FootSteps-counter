import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ToastAndroid } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { AppContext } from '../../contextApi/AppContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeChange } from '../../apptheme/ThemeChange';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SetDrinkTarget = (
    {
        modalVisible,
        setModalVisible,
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        waterdrinked,
        setwaterdrinked,
        IsgoalAchieved,
        setISgoalAchieved,
        drinkGaolData,
        cupcapacitydata,
        defaultIndexcup,
        setDefaultIndexcup,
        defaultIndexgoal,
        setDefaultIndexgoal,
        currentType,
        unitData,
        defaultUnitIndex,
        setDefaultUnitIndex,
        measuringUnit,
        setMeasuringUnit
    }
        : any) => {


    const {
        modalType,
        setWaterCupCount,
    }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const [inputValue, setInputValue] = useState<any>({})
    const saveChanges = async () => {
        setModalVisible(!modalVisible)
        if (modalType === 'cupcapacity') {
            ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT);
            setWaterCupCount(waterdrinked)
            setCupCapacity(inputValue.value);
            setDefaultIndexcup(inputValue.i);
        }
        else if (modalType === 'drinkgoal') {
            if (inputValue.value < waterdrinked) {
                ToastAndroid.show('Target Must Be Higher than Previous Target', ToastAndroid.SHORT);
                setISgoalAchieved(false)
            }
            else if (inputValue.value === waterdrinked) {
                ToastAndroid.show('Target Is Already Reached', ToastAndroid.SHORT);
                setISgoalAchieved(true)
                setDrinkGoal(inputValue.value)
                setDefaultIndexgoal(inputValue.i);
            }
            else {
                ToastAndroid.show('Target Updated Successfully', ToastAndroid.SHORT);
                setWaterCupCount(waterdrinked)
                setDrinkGoal(inputValue.value);
                setDefaultIndexgoal(inputValue.i);
                setISgoalAchieved(false)
            }
        }
        else if (modalType === 'unit') {
            ToastAndroid.show('Unit Update Successfully', ToastAndroid.SHORT);
            console.log("iiiiiiiiiiiiiiiiiiiiiiiii", inputValue)
            await AsyncStorage.setItem('unit', inputValue.value);
            setMeasuringUnit(inputValue.value)
            setDefaultUnitIndex(inputValue.i);
        }


    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : 'white' }}>

                        <WheelPickerExpo
                            height={150}
                            width={150}
                            initialSelectedIndex={modalType === 'cupcapacity' ? defaultIndexcup : modalType === 'drinkgoal' ? defaultIndexgoal : defaultUnitIndex}
                            items={
                                modalType === 'drinkgoal' ? drinkGaolData.map((name: any) => ({ label: name, value: '' }))
                                    : modalType === 'cupcapacity' ? cupcapacitydata.map((name: any) => ({ label: name, value: '' }))
                                        : unitData.map((name: any) => ({ label: name, value: '' }))
                            }
                            onChange={
                                ({ item, index }) => {
                                    setInputValue((pre: any) => ({ ...pre, value: item.label, i: index }))
                                }

                            }
                            selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : '#fc5c74' }}
                            backgroundColor={currentType === 'dark' ? useCustomTheme.darkMode.Header : 'white'}
                        />
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : '#f49913' }]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : '#0fb4fc' }]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
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

export default SetDrinkTarget;