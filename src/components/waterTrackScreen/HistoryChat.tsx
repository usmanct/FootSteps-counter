import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useThemeChange } from '../../apptheme/ThemeChange';
const screenHeight = Dimensions.get("window").height;

const HistoryChat = ({ barData, currentType, cupCapacity, drinkGoal }: any) => {
    const useCustomTheme = useThemeChange()
    const yAxixsLabels = ['0', '1000', '2000', '3000', '4000', '5000', '6000']

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
            <View style={{ ...styles.chartHeading, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : useCustomTheme.darkMode.bmiButton }}>
                <Text style={{ ...styles.textHeading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.darkMode.Text }}>HistoryChart</Text>
            </View>
            {barData.length ?
                <View style={{ padding: 10, left: 0 }}>
                    <BarChart
                        key={currentType}
                        frontColor={'#9f49ff'}
                        barWidth={40}
                        data={barData}
                        isAnimated
                        hideRules
                        stepValue={1000}
                        maxValue={6500}
                        barBorderTopLeftRadius={5}
                        barBorderTopRightRadius={5}
                        showValuesAsTopLabel={true}
                        yAxisLabelTexts={yAxixsLabels}
                        noOfSections={12}
                        xAxisThickness={0}
                        yAxisThickness={0}
                        topLabelTextStyle={{
                            color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                        }}
                        yAxisTextStyle={{
                            color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                        }}
                        xAxisLabelTextStyle={{ color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text}}

                    />
                </View>
                :
                <View>
                    <Image
                        source={require('../../../assets/waterTrackScreenAssets/Not_found_Gif.gif')}
                    />
                </View>
            }

        </View>
    );
};

export default HistoryChat;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 8,
        gap: 15,
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
    }
});
