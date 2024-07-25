import { Dimensions, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import StatsCard from './StatsCard';
import { AppContext } from '../../contextApi/AppContext';
import { BarChart } from "react-native-gifted-charts";
import { useDatabase } from '../../sqLiteDb/useDatabase';


const screenHeight = Dimensions.get("window").height;

const Results = () => {
    const {
        isLoading,
        record,
        waterRecord,
    }: any = useContext(AppContext);
    const [totalSteps, setTotalSteps] = useState(0);
    const { waterHistory }: any = useContext(AppContext)
    const [fetchData, setFetchData] = useState([])


    const { getALLWaterData } = useDatabase()

    useEffect(() => {
        getALLWaterData()
        const waterDrinkedData = waterHistory.map((data) => ({ value: data.waterIntake , label: data.date}))
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

        <View>
            <Text style={styles.headingText}>Results</Text>
            <Text style={styles.subHeading}>Steps</Text>
            {record.length ?
                <View style={styles.container}>
                    <Text style={styles.headingText}>{totalSteps}</Text>
                    <View style={{ height: screenHeight / 2 - 100 }}>
                        <FlatList
                            data={record}
                            renderItem={({ item }) => (
                                <View style={styles.subContainer}>
                                    <StatsCard icon={<AntDesign name="clockcircleo" size={14} color="red" />} value={item?.date} unit={'time'} isFirst={true} />
                                    <StatsCard icon={<SimpleLineIcons name="fire" size={14} color="red" />} value={item?.energy} unit={'kcal'} isFirst={undefined} />
                                    <StatsCard icon={<Octicons name="location" size={14} color="green" />} value={item?.distance} unit={'km'} isFirst={undefined} />
                                </View>
                            )}
                            scrollEnabled={true}
                        />
                    </View>

                </View> :
                <View style={styles.notFoundView}>
                    <Text>No Record Found</Text>
                </View>
            }
            {fetchData.length ?
                <View style={styles.container}>
                   <BarChart
                frontColor={'#0cf249'}
                barWidth={70}
                data={fetchData}
                yAxisLabelWidth={35}
                isAnimated
                hideRules
                // yAxisLabelTexts={yAxisLabels}
                stepValue={500} // Adjust this to match the scale of your y-axis
                maxValue={7000}
                yAxisThickness={0}
                xAxisThickness={0}
                barBorderRadius={5}
                // height={screenHeight - 400}
                showValuesAsTopLabel={true}
                hideYAxisText
            />
                </View> :
                <View style={styles.notFoundView}>
                    <Text>No Record Found</Text>
                </View>
            }
        </View>
    )
}

export default Results

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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
    notFoundView: {
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
