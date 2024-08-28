import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Calendar, WeekCalendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';

const History = ({ currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance }: any) => {

    const { getData, getWaterData, dropTable, insertData } = useDatabase();
    const navigation = useNavigation();
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [selected, setSelected] = useState('');

    useEffect(() => {
        console.log("Today Date: ", selected)
    }, [selected])


    const onPressDateHandler = (day: any) => {
        console.log("Press Date:", day)
        const currentMonth = day.month
        console.log('now', now)
        const today = now.getDate()
        const monthPress = now.getMonth() + 1
        console.log('fd', monthPress, currentMonth)
        const dayselected = day?.day

        const dateParts = day.dateString.split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        // console.log("Formatted Date:", formattedDate);
        setSelected(formattedDate);
        // getMyStringValue(day)
        if (today >= dayselected && currentMonth == monthPress) {
            getData(formattedDate);
            getWaterData(formattedDate)
            navigation.navigate('Results' as never)
        }


    }


    return (
        <View style={styles.upperContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Your Progress</Text>
                <TouchableOpacity style={styles.btn} onPress={() => {

                }}>
                    <Text style={styles.btnText}>Months</Text>
                    <AntDesign name="right" size={14} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.hrline}></View>
            <Calendar
                onDayPress={onPressDateHandler}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        customStyles: {
                            container: {
                                borderWidth: 2, // Border width
                                borderColor: '#fd5b72', // Border color
                                borderRadius: 20, // Half of width/height to make it a circle
                                width: 40, // Adjust to fit the date container
                                height: 40, // Adjust to fit the date container
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'green', // Background color
                            },
                            text: {
                                color: '#ffffff', // Text color
                            }
                        }
                    },
                }}
                theme={{
                    todayTextColor: '#fd5b72',
                }}
                renderArrow={(direction: string) => (
                    direction === 'left' ? (
                        <Image
                            source={require('../../../assets/homeScreenAssets/back_pink.gif')}
                            style={{ width: 10, height: 10 }}
                        />
                    ) : (
                        <Image
                            source={require('../../../assets/homeScreenAssets/next_pink.gif')}
                            style={{ width: 10, height: 10 }}
                        />
                    )
                )}
            />

        </View>
    )
}

export default History


const styles = StyleSheet.create({
    upperContainer: {
        //    backgroundColor: 'green',
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        // marginBottom: 73

    },
    container: {

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    btnView: {
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#09b9fb'
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },

    heading: {
        fontWeight: 'bold',
    },
    hrline: {
        borderWidth: 3,
        borderColor: '#f3eff8',
        // marginVertical: 5,
        width: '100%',
        height: 1,
    }




})