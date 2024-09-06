import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useThemeChange } from '../../apptheme/ThemeChange';
const screenHeight = Dimensions.get("window").height;

const HistoryChat = ({ barData, currentType }: any) => {
    const useCustomTheme = useThemeChange()

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
            <View style={{ ...styles.chartHeading, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : useCustomTheme.darkMode.bmiButton }}>
                <Text style={{ ...styles.textHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.darkMode.Text }}>HistoryChart</Text>
            </View>
            {barData.length ? <BarChart
                frontColor={'#9f49ff'}
                barWidth={50}
                data={barData}
                yAxisLabelWidth={35}
                isAnimated
                hideRules
                // yAxisLabelTexts={yAxisLabels}
                stepValue={1000} // Adjust this to match the scale of your y-axis
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
        margin: 10,
        borderRadius: 8,
        gap: 15,
        // paddingHorizontal: 10,
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    chartHeading: {
        marginHorizontal: 10,
        // marginVertical: 5,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    }
});
