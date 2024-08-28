import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
const screenHeight = Dimensions.get("window").height;

const HistoryChat = ({ barData }: any) => {



    return (
        <View style={styles.container}>
            <View style={styles.chartHeading}>
                <Text style={styles.textHeading}>HistoryChart</Text>
            </View>
            {barData.length ? <BarChart
                frontColor={'#9f49ff'}
                barWidth={50}
                data={barData.slice(barData.length - 3, barData.length)}
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
            /> :
                <View>
                    <Image
                        source={require('../images/NotFound.gif')}
                    />
                </View>
            }

        </View>
    );
};

export default HistoryChat;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 8,
        gap: 15,
        // paddingHorizontal: 10,
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333'
    },
    chartHeading: {
        backgroundColor: '#e9eaee',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    }
});
