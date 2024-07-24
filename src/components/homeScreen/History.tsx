import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';

const History = ({ currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance }) => {

    const { getData, dropTable, insertData, insertWaterData, getWaterData } = useDatabase();
    const navigation = useNavigation();


    const dummyData = [
        { id: 1, date: '2024-07-09', waterIntake: 500, cupCapacity: 250, goal: 2000 },
        { id: 2, date: '2024-07-10', waterIntake: 750, cupCapacity: 250, goal: 2000 },
        { id: 3, date: '2024-07-11', waterIntake: 1000, cupCapacity: 250, goal: 2000 },
        { id: 4, date: '2024-07-12', waterIntake: 1250, cupCapacity: 250, goal: 2000 },
        { id: 5, date: '2024-07-13', waterIntake: 1500, cupCapacity: 250, goal: 2000 },
        { id: 6, date: '2024-07-14', waterIntake: 1750, cupCapacity: 250, goal: 2000 },
        { id: 7, date: '2024-07-15', waterIntake: 2000, cupCapacity: 250, goal: 2000 },
        { id: 8, date: '2024-07-16', waterIntake: 2250, cupCapacity: 250, goal: 2000 },
        { id: 9, date: '2024-07-17', waterIntake: 2500, cupCapacity: 250, goal: 2000 }
    ];


    const [selected, setSelected] = useState('');
    const now = new Date();
    const dateOnly = now.toLocaleDateString();

    useEffect(() => {
        console.log("Today Date: ", selected)
    }, [selected])

    const onPressDateHandler = (day: any) => {
        console.log("Press Date:", day)
        const today = now.getDate()
        const dayselected = day?.day

        const dateParts = day.dateString.split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        // console.log("Formatted Date:", formattedDate);
        setSelected(formattedDate);
        // getMyStringValue(day)
        if (today >= dayselected) {
            getData(formattedDate);
            getWaterData(formattedDate)
            navigation.navigate('Results' as never, { currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance })
        }


    }


    return (
        <View style={styles.upperContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Your Progress</Text>
                <TouchableOpacity style={styles.btn} onPress={() => {

                    //     dummyData.forEach((d) => (
                    // insertWaterData(d)
                    //  ))

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