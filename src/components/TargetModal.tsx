import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useThemeChange } from '../apptheme/ThemeChange';

const TargetModal = ({ modalVisible, setModalVisible, target, setTarget, currentType, showOverLay, setShowOverLay }: any) => {

    const data: any = [10, 20, 50, 100, 200, 300, 500, 600, 700, 800, 900, 1000, 2000,]
    const [inputValue, setInputValue] = useState<any>({})
    const [defaultIndex, setDefaultIndex] = useState(0)
    const usecustomTheme = useThemeChange()
    useEffect(() => {
        console.log(inputValue)
        console.log(defaultIndex)

    }, [target])


    const saveChanges = () => {
        setTarget(inputValue.value)
        setDefaultIndex(inputValue.i)
        setModalVisible(!modalVisible)
        setShowOverLay(!showOverLay)
    }



    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white' }}>
                        <WheelPickerExpo
                            height={150}
                            width={150}
                            initialSelectedIndex={defaultIndex}
                            items={data.map((name: any) => ({ label: name, value: '' }))}
                            onChange={
                                ({ item, index }) => {
                                    setInputValue((pre: any) => ({ ...pre, value: item.label, i: index }))
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
                            }
                            }>
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
        color: '#0cf249',
        fontWeight: 'bold',
    }
});

export default TargetModal;