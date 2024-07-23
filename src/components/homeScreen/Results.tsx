import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import StatsCard from './StatsCard';
import { AppContext } from '../../contextApi/AppContext';
import { BarChart } from 'react-native-chart-kit';


const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // bars color can be set here, currently black
    strokeWidth: 1,
    barPercentage: 0.9,
    useShadowColorFromDataset: false,

};
const Results = ({ route }) => {
    const {
        isLoading,
        record,
        waterRecord,
    }: any = useContext(AppContext);
    const { currentStepCount, setCurrentStepCount, kcal, setKcal, distance, setDistance } = route.params;
    const [totalSteps, setTotalSteps] = useState(0);


    const data = {
        labels: [waterRecord[0]?.date],
        datasets: [
            {
                data: [waterRecord[0]?.waterIntake],
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // target color
                label: 'Target'
            }
        ]
    };


    useEffect(() => {
        let total = 0;
        record?.forEach((e: any) => {
            total += e.footsteps;
        });
        setTotalSteps(total);
    }, [record]);
    return (isLoading ?
        <View style={styles.loaderView}>
            <Text>Loading.......</Text>
        </View> :
        <View>
            <Text style={styles.headingText}>Results</Text>
            <Text style={styles.subHeading}>Steps</Text>
            <View style={styles.container}>
                <Text style={styles.headingText}>{totalSteps}</Text>
                <FlatList
                    data={record}
                    renderItem={({ item }) => (
                        <View style={styles.subContainer}>
                            <StatsCard icon={<AntDesign name="clockcircleo" size={14} color="red" />} value={item?.date} unit={'time'} isFirst={true} />
                            <StatsCard icon={<SimpleLineIcons name="fire" size={14} color="red" />} value={item?.energy} unit={'kcal'} isFirst={undefined} />
                            <StatsCard icon={<Octicons name="location" size={14} color="green" />} value={item?.distance} unit={'km'} isFirst={undefined} />
                        </View>
                    )}
                />

            </View>
            <View style={styles.container}>
                <BarChart
                    data={data}
                    width={screenWidth - 35}
                    height={300}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    showBarTops={true}
                />
            </View>
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
    }


})
