import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useThemeChange } from '../../apptheme/ThemeChange';

const Row = ({ title, subtil, onpress, currentType , measuringUnit }: any) => {

    const useCustomTheme = useThemeChange()


    return (
        <View style={styles.row}>
            <Text style={{ ...styles.titleText, color: currentType === 'dark' ? 'white' : 'black' }}>{title}</Text>
            <TouchableOpacity
                onPress={onpress}
                style={styles.btn}
            >
                <Text style={{ color: currentType === 'dark' ? 'white' : 'black' }}>{subtil}</Text>
                <AntDesign name="down" size={14} color={currentType === 'dark' ? 'white' : 'black'} />

            </TouchableOpacity>
        </View>
    )
}



export default Row

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
        width: ' 100%'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    btn: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 14
    }
})