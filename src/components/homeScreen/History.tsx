import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Calendar, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';
import moment from 'moment'

const History = ({ currentType, currentStepCount, target }: any) => {

    const { getData, getWaterData } = useDatabase();
    const navigation = useNavigation();
    // const { currentType }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const todayDate = now.toISOString().split('T')[0] || "2024-09-12"; // Format current date to 'YYYY-MM-DD'
    const [selected, setSelected] = useState<any>('');
    const [stepProgress, setStepProgress] = useState<any>(todayDate);
    const [calenderType, setCalenderType] = useState('Month');
    const [calenderModal, setCalenderModal] = useState(false)

    const isFocused = useIsFocused();
    useEffect(() => {
        const progress = (currentStepCount / target) * 100;
        setStepProgress(progress)
    }, [target, currentStepCount])
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

    const isFutureDate = (date: any) => {
        return moment(date).isAfter(moment(), 'day'); // Compare dates
    };
    const markedDates = {
        [todayDate]: {
            customStyles: {
                container: {
                    borderColor: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke,
                    borderWidth: 1,
                },
                text: {
                    color: currentType === 'dark' ? useCustomTheme.darkMode.Text : '#fd5b72',
                },
            },
        },
        [selected]: {
            selected: true,
            disableTouchEvent: true,
        },
        ...Array.from({ length: 31 }).reduce((acc, _, index) => {
            const date = moment().startOf('month').add(index, 'days').format('YYYY-MM-DD');
            if (isFutureDate(date)) {
                acc[date] = {
                    customStyles: {
                        text: {
                            color: 'gray', // Adjust text color for contrast
                        },
                    },
                };
            }
            return acc;
        }, {}),
    };


    const toggleMonthWeekHandler = () => {
        setCalenderModal(!calenderModal)
    }

    const setCalenderTypeHandler = (type: string) => {
        setCalenderType(type)
        setCalenderModal(!calenderModal)
    }


    return (
        <View style={{ ...styles.upperContainer, backgroundColor: currentType === 'dark' ? useCustomTheme?.darkMode?.bgcolor : 'white' }}>
            <View style={styles.container}>
                <Text style={{ ...styles.heading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Your Progress</Text>
                <TouchableOpacity
                    style={{ ...styles.btn, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn2 : useCustomTheme.lightMode.Btn2 }}
                    onPress={toggleMonthWeekHandler}>
                    <Text style={styles.btnText}>{calenderType}</Text>
                    <AntDesign name="right" size={14} color="white" />
                </TouchableOpacity>
                {calenderModal ?
                    <View
                        style={{
                            ...styles.calenderModal,
                            backgroundColor: currentType === 'dark' ? useCustomTheme?.darkMode?.bgcolor : 'white',
                            borderColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                        }}>
                        <TouchableOpacity
                            style={{
                                ...styles.calenderTypeModalBtn,
                                borderColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                            }}
                            onPress={() => setCalenderTypeHandler('Week')}
                        >
                            <Text
                                style={{ color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}
                            >Week</Text>
                        </TouchableOpacity>
                        <View style={{
                            borderTopWidth: .5,
                            borderColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                        }}
                        ></View>
                        <TouchableOpacity
                            style={{
                                ...styles.calenderTypeModalBtn,
                                borderColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                            }}
                            onPress={() => setCalenderTypeHandler('Month')}
                        >
                            <Text
                                style={{ color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}
                            >Month</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </View>
            <View style={{ ...styles.hrline, borderColor: currentType === 'dark' ? '#14161d' : useCustomTheme.lightMode.Header }}></View>
            <CalendarProvider date={''}>
                {
                    calenderType === 'Month' ?
                        <Calendar
                            key={currentType}
                            onDayPress={onPressDateHandler}
                            markingType={'custom'}
                            hideExtraDays={true}
                            enableSwipeMonths={true}
                            markedDates={markedDates}
                            theme={{
                                todayTextColor: currentType === 'dark' ? useCustomTheme?.darkMode?.activeStroke : '#fd5b72',
                                calendarBackground: 'transparent',
                                backgroundColor: 'transparent',
                                dayTextColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text,
                                monthTextColor: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text,
                            }}
                            renderArrow={(direction: string) => (
                                direction === 'left' ? (
                                    currentType === 'dark' ? (
                                        <Image
                                            source={require('../../../assets/homeScreenAssets/back_green.png')}
                                            style={{ width: 10, height: 10 }}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../../../assets/homeScreenAssets/back_pink.gif')}
                                            style={{ width: 10, height: 10 }}
                                        />
                                    )
                                ) : (
                                    currentType === 'dark' ? (
                                        <Image
                                            source={require('../../../assets/homeScreenAssets/next_green.png')}
                                            style={{ width: 10, height: 10 }}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../../../assets/homeScreenAssets/next_pink.gif')}
                                            style={{ width: 10, height: 10 }}
                                        />
                                    )
                                )
                            )}
                        />
                        :
                        <WeekCalendar
                            onDayPress={onPressDateHandler}
                            firstDay={1}
                            markingType={'custom'}
                            markedDates={{
                                '2024-09-12': {
                                    customStyles: {
                                        container: {
                                            borderColor: 'blue',
                                            borderWidth: 1,
                                        },
                                        text: {
                                            color: 'blue',
                                        },
                                    },
                                },
                                [selected]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                },
                            }}
                            theme={{
                                todayTextColor: 'blue',
                                calendarBackground: 'transparent',
                                dayTextColor: 'black',
                                monthTextColor: 'black',
                            }}
                        />

                }
            </CalendarProvider>

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
        position: 'relative',
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
        zIndex: 1
    },
    calenderModal: {
        position: 'absolute',
        top: 30,
        right: 0,
        borderRadius: 8,
        zIndex: 10,
        borderWidth: .5,
    },
    calenderTypeModalBtn: {
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 5
    }
})