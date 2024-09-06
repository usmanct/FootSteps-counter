import { Dimensions, FlatList, StyleSheet, Text, View, Image, TouchableOpacity , ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import StatsCard from './StatsCard';
import { AppContext } from '../../contextApi/AppContext';
import { BarChart } from "react-native-gifted-charts";
import { useDatabase } from '../../sqLiteDb/useDatabase';
import { useThemeChange } from '../../apptheme/ThemeChange';

const screenHeight = Dimensions.get("window").height;

const Results = () => {
    const {
        record,
        currentType
    }: any = useContext(AppContext);
    const useCustomTheme = useThemeChange()
    const [totalSteps, setTotalSteps] = useState(0);
    const { waterHistory }: any = useContext(AppContext)
    const [fetchData, setFetchData] = useState<any>([])


    const { getALLWaterData, dropTable, insertData } = useDatabase()

    useEffect(() => {
        getALLWaterData()
        const waterDrinkedData = waterHistory.map((data: { waterIntake: any; date: any; }) => ({ value: data.waterIntake, label: data.date }))
        setFetchData([...waterDrinkedData])
        // console.log('waterDrinkedData', waterDrinkedData)
    }, [waterHistory])

    useEffect(() => {
        let total = 0;
        record?.forEach((e: any) => {
            total += e.footsteps;
        });
        setTotalSteps(total);

    }, [record]);
    return (
        <View style={{ flex: 1, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
            <ScrollView>
                <TouchableOpacity onPress={dropTable}>
                    <Text style={styles.headingText}>Results</Text>
                </TouchableOpacity>
                {record.length ?
                    <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
                        {record.length ? <Text style={{ ...styles.subHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Steps</Text> : null}
                        <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{totalSteps}</Text>
                        <FlatList
                            data={record}
                            renderItem={({ item }) => (
                                <View style={styles.subContainer}>
                                    <StatsCard
                                        icon={require('../../../assets/homeScreenAssets/distance_icon.png')}
                                        value={item?.distance}
                                        unit={'Km'}
                                        isFirst={undefined}
                                    />
                                    <StatsCard isFirst={true}
                                        icon={require('../../../assets/homeScreenAssets/timer_icon.png')}
                                        value={item?.date}
                                        unit={'Timer'}
                                    />
                                    <StatsCard
                                        icon={require('../../../assets/homeScreenAssets/calories_icon.png')}
                                        value={item?.energy} unit={'Kcal'}
                                        isFirst={undefined}
                                    />
                                </View>
                            )}
                            scrollEnabled={true}
                        />
                    </View> :
                    null
                }
                {fetchData.length ?
                    <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.bgcolor }}>
                        <Text style={{ ...styles.subHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Water Track History</Text>
                        <BarChart
                            frontColor={'#9f49ff'}
                            barWidth={50}
                            data={fetchData}
                            yAxisLabelWidth={35}
                            isAnimated
                            hideRules
                            // yAxisLabelTexts={yAxisLabels}
                            stepValue={500} // Adjust this to match the scale of your y-axis
                            maxValue={7000}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            // barBorderRadius={5}
                            barBorderTopLeftRadius={5}
                            barBorderTopRightRadius={5}
                            // height={screenHeight - 400}
                            showValuesAsTopLabel={true}
                            hideYAxisText
                        />
                    </View> :
                    null
                }
            </ScrollView>
            {!fetchData.length && !record.length ?
                <View style={styles.notFoundContainer}>
                    <Image
                        source={require('../images/NotFound.gif')}
                    />
                </View>
                : null}
        </View>

    )
}

export default Results

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9eaee',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    loaderView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    subContainer: {

        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'white',
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,

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
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        // flex: 1,
        textAlign: 'center',
        marginVertical: 10,

    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        gap: 15,
        paddingHorizontal: 10,
    }


})
