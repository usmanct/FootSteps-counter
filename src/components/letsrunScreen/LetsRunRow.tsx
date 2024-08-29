import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useThemeChange } from '../../apptheme/ThemeChange';

const LetsRunRow = ({ title, subtil, onpress, currentType }: any) => {
    const useCustomTheme = useThemeChange()

    return (
        <View style={styles.row}>
            <Text style={{ ...styles.titleText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{title}</Text>
            <TouchableOpacity
                onPress={onpress}
                style={styles.btn}
            >
                <Text style={{ color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{subtil}</Text>
                <AntDesign name="down" size={14} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : 'grey'} />

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
    },
    btn: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 14
    }
})