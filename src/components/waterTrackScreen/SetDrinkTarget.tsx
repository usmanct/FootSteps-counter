import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ToastAndroid } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { AppContext } from '../../contextApi/AppContext';
import { useNavigation } from '@react-navigation/native';

const SetDrinkTarget = ({ modalVisible, setModalVisible }) => {

    const drinkGaolData: any = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,]
    const cupcapacitydata: any = [50, 100, 150, 200, 250, 300]
    const {
        drinkGoal,
        setDrinkGoal,
        cupCapacity,
        setCupCapacity,
        IsgoalAchieved,
        setISgoalAchieved,
        modalType,
        setModalType,

    }: any = useContext(AppContext)

    const [inputValue, setInputValue] = useState<any>({})
    const [defaultIndexcup, setDefaultIndexcup] = useState(0)
    const [defaultIndexgoal, setDefaultIndexgoal] = useState(0)

    const navigation = useNavigation();

    // useEffect(() => {
    //     console.log(inputValue)
    //     console.log(defaultIndex)

    // }, [target])


    const saveChanges = () => {
        console.log(inputValue)
        setModalVisible(!modalVisible)
        if (modalType === 'cupcapacity') {
            setCupCapacity(inputValue.value);
            setDefaultIndexcup(inputValue.i);
        } else if (inputValue.value < drinkGoal && IsgoalAchieved) {
            ToastAndroid.show('Target Must Be Higher than Previous Target', ToastAndroid.SHORT);
        } else {
            setDrinkGoal(inputValue.value);
            setDefaultIndexgoal(inputValue.i);
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
                    <View style={styles.modalView}>
                        {/* <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={inputValue}
                            placeholder=""
                            keyboardType="numeric"
                        /> */}
                        <WheelPickerExpo
                            height={150}
                            width={150}
                            initialSelectedIndex={modalType === 'cupcapacity' ? defaultIndexcup : defaultIndexgoal}
                            items={
                                modalType === 'drinkgoal' ? drinkGaolData.map(name => ({ label: name, value: '' }))
                                    : modalType === 'cupcapacity' ? cupcapacitydata.map(name => ({ label: name, value: '' }))
                                        : cupcapacitydata.map(name => ({ label: name, value: '' }))
                            }
                            onChange={
                                ({ item, index }) => {
                                    setInputValue(pre => ({ ...pre, value: item.label, i: index }))
                                }

                            }
                            selectedStyle={styles.selectedItem}
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
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#0cf249',
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
        borderColor: '#0cf249',
        color: '#0cf249',
        fontWeight: 'bold',
    }
});

export default SetDrinkTarget;