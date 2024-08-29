import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Calendar, WeekCalendar } from 'react-native-calendars';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';

const History = ({ currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance }: any) => {

    const { getData, getWaterData } = useDatabase();
    const navigation = useNavigation();
    const { currentType }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [selected, setSelected] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log("Today Date: ", selected)
        console.log("From History Current Type", currentType)

    }, [selected, currentType])
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
        <View style={{ ...styles.upperContainer, backgroundColor: currentType === 'dark' ? useCustomTheme?.darkMode?.bgcolor : 'white' }}>
            <View style={styles.container}>
                <Text style={{ ...styles.heading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Your Progress</Text>
                <TouchableOpacity style={{ ...styles.btn, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn2 : useCustomTheme.lightMode.Btn2 }} onPress={() => {

                }}>
                    <Text style={styles.btnText}>Months</Text>
                    <AntDesign name="right" size={14} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.hrline, borderColor: currentType === 'dark' ? '#14161d' : useCustomTheme.lightMode.Header }}></View>
            <Calendar
                onDayPress={onPressDateHandler}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                    },
                }}
                theme={{
                    todayTextColor: currentType === 'dark' ? useCustomTheme?.darkMode?.activeStroke : '#fd5b72',
                    calendarBackground: 'Transparent',
                    backgroundColor: 'Transparent',
                }}
                renderArrow={(direction: string) => (
                    direction === 'left' ? (
                        currentType === 'dark' ?
                            <Image
                                source={require('../../../assets/homeScreenAssets/back_green.png')}
                                style={{ width: 10, height: 10 }}
                            /> :
                            <Image
                                source={require('../../../assets/homeScreenAssets/back_pink.gif')}
                                style={{ width: 10, height: 10 }}
                            />
                    ) : (
                        currentType === 'dark' ?
                            <Image
                                source={require('../../../assets/homeScreenAssets/next_green.png')}
                                style={{ width: 10, height: 10 }}
                            /> :
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
        borderTopWidth: 3,
        // marginVertical: 5,
        width: '100%',
    }




})