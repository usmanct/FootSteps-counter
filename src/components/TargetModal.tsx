import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useThemeChange } from '../apptheme/ThemeChange';
const TargetModal = (
    {
        modalVisible,
        setModalVisible,
        setTarget,
        currentType,
        showOverLay,
        setShowOverLay,
        data,
        defaultIndex,
        setDefaultIndex
    }
        : any) => {
    const usecustomTheme = useThemeChange()
    const [inputValue, setInputValue] = useState<any>({})
    const saveChanges = () => {
        setTarget(inputValue.value)
        setDefaultIndex(inputValue.i)
        setModalVisible(!modalVisible)
        setShowOverLay(!showOverLay)
    }
    const closeModal = useCallback(() => {
        setModalVisible(false);
        setShowOverLay(false);
    }, [setModalVisible, setShowOverLay]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, color: currentType === 'dark' ? usecustomTheme.darkMode.Text : usecustomTheme.lightMode.Text }}>Set Target</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <WheelPickerExpo
                                height={150}
                                width={50}
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
                            <Text style={{ fontWeight: "bold", color: currentType === 'dark' ? usecustomTheme.darkMode.Text : usecustomTheme.lightMode.Text }}>Steps</Text>
                        </View>
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.bmiButton : '#f49913' }]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Btn1 : '#0fb4fc' }]}
                            onPress={closeModal}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default TargetModal;
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
    selectedItem: {
        borderWidth: 2,
        color: '#0cf249',
        fontWeight: 'bold',
    }
});