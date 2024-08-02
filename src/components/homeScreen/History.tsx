import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';

const History = ({ currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance }) => {

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
                    <AntDesign name="right" size={12} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.hrline}></View>
            <Calendar
                onDayPress={onPressDateHandler}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, }
                }}
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
        borderWidth: 1,
        borderRadius: 360,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    btnText: {
        fontSize: 12,
    },

    heading: {
        fontWeight: 'bold',
    },
    hrline: {
        borderWidth: 1,
        borderColor: 'lightgray',
        marginVertical: 5,
        width: '100%',
        height: 1,
    }




})