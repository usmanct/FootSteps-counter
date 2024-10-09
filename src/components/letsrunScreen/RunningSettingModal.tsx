import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useThemeChange } from '../../apptheme/ThemeChange';

const TargetModal = (
    {
        modalVisible,
        setModalVisible,
        modalType,
        setModalType,
        setReminderTime,
        settimeDuration,
        setDsitanceCovered,
        settargetKcalBurn,
        currentType,
        setShowOverLay,
        showOverLay,
        setStartTime,
        setInterval,
        setEndTime,
        startTimeDefaultIndex,
        setStartTimeDefaultIndex,
        endTimeDefaultIndex,
        setEndTimeDefaultIndex,
        setIntervalTimeDefaultIndex,
        intervalDefaultIndex,
        setReminderDefaultIndex,
        reimderDefaultIndex,
        dataHour,
        dataMin,
        md,
        dataHoursInterval
    }: any) => {
    const usecustomTheme = useThemeChange()
    const datakm: any = Array.from({ length: 21 }, (_, i) => i);
    const datakcal: any = Array.from({ length: 401 }, (_, i) => i);
    const [inputValue, setInputValue] = useState<any>({});
    const [timeValue, setTimeValue] = useState<any>({
        hour: 0,
        hindex: 0,
        md: 0,
        minute: 0,
        mindex: 0,
        mdindex: 0,
    })
    const [defaultIndexTime, setDefaultIndexTime] = useState({
        hour: 0,
        minute: 0
    });
    const [defaultIndex, setDefaultIndex] = useState(0);
    const saveChanges = () => {

        if (modalType === 'account') {
            setReminderDefaultIndex({
                hour: timeValue.hindex,
                minute: timeValue.mindex,
                md: timeValue.mdindex
            })
            setReminderTime({
                h: timeValue.hour,
                m: timeValue.minute,
                md: timeValue.md
            })
        }
        else if (modalType === 'duration') {
            setDefaultIndexTime({
                hour: timeValue.hindex,
                minute: timeValue.mindex
            })
            settimeDuration({
                h: timeValue.hour,
                m: timeValue.minute
            })
        }
        else if (modalType === 'Start Time') {
            setStartTimeDefaultIndex({
                h: timeValue.hindex,
                m: timeValue.mindex,
                md: timeValue.mdindex
            })
            setStartTime({
                h: timeValue.hour,
                m: timeValue.minute,
                md: timeValue.md
            })
        }
        else if (modalType === 'End Time') {
            setEndTimeDefaultIndex({
                hour: timeValue.hindex,
                minute: timeValue.mindex,
                md: timeValue.mdindex
            })
            setEndTime({
                h: timeValue.hour,
                m: timeValue.minute,
                md: timeValue.md
            })
        }
        else if (modalType === 'Interval') {
            setIntervalTimeDefaultIndex({
                hour: timeValue.hindex,
                minute: timeValue.mindex,
            })
            setInterval({
                h: timeValue.hour,
                m: timeValue.minute,
            })
        }
        else if (modalType === 'distance') {
            setDefaultIndex(inputValue.i)
            setDsitanceCovered(inputValue.value)
        }
        else {
            setDefaultIndex(inputValue.i)
            settargetKcalBurn(inputValue.value)
        }
        setModalVisible(!modalVisible);
        setShowOverLay(!showOverLay);
        setModalType('')
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white' }}>
                        <Text style={{ fontWeight: 'bold', color: currentType === 'dark' ? usecustomTheme.darkMode.Text : usecustomTheme.lightMode.Text }}>{modalType === 'account' ? 'Set Time' : modalType}</Text>
                        {modalType === 'duration' || modalType === 'account' || modalType === 'Start Time' || modalType === 'End Time' || modalType === 'Interval'
                            ?
                            <View style={styles.wheelRow}>
                                <View style={styles.pickerContainer}>
                                    <WheelPickerExpo
                                        height={150}
                                        width={50}
                                        initialSelectedIndex={
                                            modalType === 'Start Time' ?
                                                startTimeDefaultIndex.h :
                                                modalType === 'End Time' ?
                                                    endTimeDefaultIndex.h :
                                                    modalType === 'Interval' ?
                                                        intervalDefaultIndex.h :
                                                        modalType === 'account' ?
                                                            reimderDefaultIndex.h :
                                                            defaultIndexTime.hour}
                                        items={modalType === 'Interval' ? dataHoursInterval.map((name: any) => ({ label: name, value: '' })) : dataHour.map((name: any) => ({ label: name, value: '' }))}
                                        onChange={
                                            ({ item, index }) => {
                                                setTimeValue((prev: any) => ({ ...prev, hour: item.label, hindex: index }));
                                            }
                                        }
                                        selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? usecustomTheme.darkMode.activeStroke : '#fc5c74' }}
                                        backgroundColor={currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white'}
                                    />
                                </View>
                                <View style={styles.pickerContainer}>
                                    <WheelPickerExpo
                                        height={150}
                                        width={50}
                                        initialSelectedIndex={modalType === 'Start Time' ?
                                            startTimeDefaultIndex.m :
                                            modalType === 'End Time' ?
                                                endTimeDefaultIndex.m :
                                                modalType === 'Interval' ?
                                                    intervalDefaultIndex.m :
                                                    modalType === 'account' ?
                                                        reimderDefaultIndex.m :
                                                        defaultIndexTime.minute
                                        }
                                        items={dataMin.map((name: any) => ({ label: name, value: '' }))}
                                        onChange={
                                            ({ item, index }) => {
                                                setTimeValue((prev: any) => ({ ...prev, minute: item.label, mindex: index }));
                                            }
                                        }
                                        selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? usecustomTheme.darkMode.activeStroke : '#fc5c74' }}
                                        backgroundColor={currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white'}
                                    />
                                </View>
                                {!(modalType === 'Interval') &&
                                    <View style={styles.pickerContainer}>
                                        <WheelPickerExpo

                                            height={150}
                                            width={50}
                                            initialSelectedIndex={modalType === 'Start Time' ?
                                                startTimeDefaultIndex.md :
                                                modalType === 'End Time' ?
                                                    endTimeDefaultIndex.md :
                                                    modalType === 'account' ?
                                                        reimderDefaultIndex.md :
                                                        defaultIndexTime.minute
                                            }
                                            items={(md || []).map((name: any) => ({ label: name, value: '', }))}
                                            onChange={
                                                ({ item, index }) => {
                                                    setTimeValue((prev: any) => ({ ...prev, md: item.label, mdindex: index }));
                                                }
                                            }
                                            selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? usecustomTheme.darkMode.activeStroke : '#fc5c74' }}
                                            backgroundColor={currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white'}
                                        />
                                    </View>
                                }

                            </View>
                            :
                            <View style={styles.pickerContainer}>
                                <WheelPickerExpo
                                    height={150}
                                    width={50}
                                    initialSelectedIndex={defaultIndex}
                                    items={modalType === 'distance' ? datakm.map((name: any) => ({ label: name, value: '' })) : datakcal.map((name: any) => ({ label: name, value: '' }))}
                                    onChange={
                                        ({ item, index }) => {
                                            setInputValue((prev: any) => ({ ...prev, value: item.label, i: index }));
                                        }
                                    }
                                    selectedStyle={{ ...styles.selectedItem, borderColor: currentType === 'dark' ? usecustomTheme.darkMode.activeStroke : '#fc5c74' }}
                                    backgroundColor={currentType === 'dark' ? usecustomTheme.darkMode.Header : 'white'}
                                />
                                <Text style={{ color: currentType === 'dark' ? usecustomTheme.darkMode.Text : usecustomTheme.lightMode.Text }}>{modalType === 'distance' ? 'km' : 'kcal'}</Text>
                            </View>
                        }

                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.bmiButton : '#f49913' }]}
                            onPress={saveChanges}>
                            <Text style={styles.textStyle}>Save Changes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: currentType === 'dark' ? usecustomTheme.darkMode.Btn1 : '#0fb4fc' }]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                setShowOverLay(!showOverLay);
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
export default TargetModal;

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
        fontSize: 14
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: '#fc5c74',
        color: '#0cf249',
        fontWeight: 'bold',
    },
    wheelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    pickerLabel: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});