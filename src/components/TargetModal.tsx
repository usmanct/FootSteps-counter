import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const TargetModal = ({ modalVisible, setModalVisible, target, setTarget  }) => {

    const data :  any = [10, 20,50, 100, 200, 300, 500, 600, 700, 800, 900, 1000, 2000,]
    const [inputValue, setInputValue] = useState<any>({})
    const [defaultIndex, setDefaultIndex] = useState(0)

    useEffect(() => {
        console.log(inputValue)
        console.log(defaultIndex)

    }, [target])


    const saveChanges = () => {
        setTarget(inputValue.value)
        setDefaultIndex(inputValue.i)
        setModalVisible(!modalVisible)
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
                            initialSelectedIndex={defaultIndex}
                            items={data.map(name => ({ label: name, value: '' }))}
                            onChange={
                                ({ item, index }) => {
                                    setInputValue(pre => ({ ...pre, value: item.label, i: index  }))
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
    selectedItem:{
        borderWidth:2,
        borderColor:'#0cf249',
        color:'#0cf249',
        fontWeight: 'bold',
    }
});

export default TargetModal;