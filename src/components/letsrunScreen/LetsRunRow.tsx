import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const LetsRunRow = ({ title, subtil, onpress }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity
                onPress={onpress}
                style={styles.btn}
            >
                <Text>{subtil}</Text>
                <AntDesign name="down" size={14} color="grey" />

            </TouchableOpacity>
        </View>
    )
}



export default LetsRunRow

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        width: ' 100%',
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    btn: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 14
    }
})