import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import { AppContext } from '../../contextApi/AppContext';
import { BarChart } from "react-native-gifted-charts";
import { useDatabase } from '../../sqLiteDb/useDatabase';
import { useThemeChange } from '../../apptheme/ThemeChange';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Results = () => {
    const {
        record,
        currentType
    }: any = useContext(AppContext);
    const navigation = useNavigation();
    const useCustomTheme = useThemeChange();
    const [totalSteps, setTotalSteps] = useState(0);
    const { waterHistory }: any = useContext(AppContext);
    const [fetchData, setFetchData] = useState<any>([]);

    const yAxixsLabels = ['0', '1000', '2000', '3000', '4000', '5000', '6000'];
    const { getALLWaterData, dropTable } = useDatabase();

    useEffect(() => {
        getALLWaterData();
        const waterDrinkedData = waterHistory.map((data: { waterIntake: any; date: any; }) => ({ value: data.waterIntake, label: data.date }));
        setFetchData([...waterDrinkedData]);
    }, [waterHistory]);

    useEffect(() => {
        let total = 0;
        record?.forEach((e: any) => {
            total += e.footsteps;
        });
        setTotalSteps(total);
    }, [record]);

    const renderRecordItem = ({ item }: any) => (
        <View style={styles.subContainer}>
            <StatsCard
                icon={require('../../../assets/homeScreenAssets/distance_icon.png')}
                value={item?.distance}
                unit={'Km'}
                isFirst={undefined}
            />
            <StatsCard
                isFirst={true}
                icon={require('../../../assets/homeScreenAssets/timer_icon.png')}
                value={item?.date}
                unit={'Timer'}
            />
            <StatsCard
                icon={require('../../../assets/homeScreenAssets/calories_icon.png')}
                value={item?.energy} 
                unit={'Kcal'}
                isFirst={undefined}
            />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
            <View>
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="keyboard-backspace" size={24} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={dropTable}>
                        <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Results</Text>
                    </TouchableOpacity>
                </View>

                {/* {record.length ? ( */}
                    <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white' }}>
                        <View style={{ ...styles.chartHeading, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : useCustomTheme.darkMode.bmiButton }}>
                            <Text style={{ ...styles.textHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.darkMode.Text }}>FootSteps</Text>
                        </View>
                        <Text style={{ ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{totalSteps}</Text>

                        {/* Move the FlatList here to render directly below the FootSteps count */}
                        <FlatList
                            data={record}
                            renderItem={renderRecordItem}
                            keyExtractor={(item) => item.date} // Make sure to provide a keyExtractor for FlatList
                            scrollEnabled={true}
                        />
                    </View>
                {/* ) : null} */}

                {fetchData.length ? (
                    <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.bgcolor }}>
                        <View style={{ ...styles.chartHeading, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : useCustomTheme.darkMode.bmiButton }}>
                            <Text style={{ ...styles.textHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.darkMode.Text }}>Water Drinked</Text>
                        </View>
                        <BarChart
                            frontColor={'#9f49ff'}
                            barWidth={40}
                            data={fetchData}
                            isAnimated
                            hideRules
                            stepValue={1000}
                            maxValue={7000}
                            barBorderTopLeftRadius={5}
                            barBorderTopRightRadius={5}
                            showValuesAsTopLabel={true}
                            noOfSections={6}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisLabelTexts={yAxixsLabels}
                            topLabelTextStyle={{
                                color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                            }}
                            yAxisTextStyle={{
                                color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                            }}
                            xAxisLabelTextStyle={{ color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}
                        />
                    </View>
                ) : null}
            </View>
            {!fetchData.length && !record.length ? (
                <View style={styles.notFoundContainer}>
                    <Image
                        source={require('../../../assets/waterTrackScreenAssets/Not_found_Gif.gif')}
                    />
                </View>
            ) : null}
        </View>
    );
};

export default Results;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 8,
        gap: 15,
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
        margin: 10,
        marginTop: 5,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    btnView: {
        justifyContent: 'flex-end',
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
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    chartHeading: {
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    backButton: {
        position: 'absolute',
        left: 10, // Adjust to fit your layout
        justifyContent: 'center',
    },
});
