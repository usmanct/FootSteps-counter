import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const HistoryChat = () => {
    const chartConfig = {
        backgroundGradientFrom: 'transparent',
        backgroundGradientTo: 'transparent',
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // bars color can be set here, currently black
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    const data = {
        labels: ['20', '21', '22', '23'],
        datasets: [
            {
                data: [2000, 3000, 1500, 3500]
            }
        ]
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>HistoryChat</Text>
            <BarChart
                data={data}
                width={screenWidth - 35}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
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
    textHeading:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333'
    }
});
