import { StyleSheet, Text, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
const screenHeight = Dimensions.get("window").height;

const HistoryChat = ({ barData, }) => {



    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>HistoryChat</Text>
            {barData.length ? <BarChart
                frontColor={'#0cf249'}
                barWidth={70}
                data={barData.slice(barData.length - 3, barData.length)}
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
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
    },
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333'
    }
});
