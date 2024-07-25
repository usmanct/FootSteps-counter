import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
const screenWidth = Dimensions.get("window").width;

const HistoryChat = ({barData}) => {


    // console.log('waterDrinkedData', wdata)
    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>HistoryChat</Text>
            <BarChart
                frontColor={'#0cf249'}
                barWidth={22}
                data={barData}
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
    textHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333'
    }
});
