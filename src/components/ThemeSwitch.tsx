import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AppContext } from '../contextApi/AppContext';
import { useThemeChange } from '../apptheme/ThemeChange';

const ThemeSwitch = () => {

    const {
        currentType,
        setCurrentType
    }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()

    const [themeMode, setThemeMode] = useState<string>('light')



    const toggleTheme = () => {
        setThemeMode((pre: string) => (pre === 'light' ? 'dark' : 'light'))
        setCurrentType((pre: string) => (pre === 'light' ? 'dark' : 'light'))
    }


    useEffect(() => {
        console.log("currentType", currentType)
        console.log(" themeMode", themeMode)
    }, [currentType, themeMode])

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
            <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>{themeMode === 'light' ? 'Light' : 'Dark'} Mode </Text>
            <TouchableOpacity
                onPress={toggleTheme}
            >
                {themeMode === 'light' ?
                    <MaterialIcons name="dark-mode" size={20} color="black" />
                    :
                    <MaterialIcons name="light-mode" size={20} color="white" />
                }
            </TouchableOpacity>
        </View>
    )
}

export default ThemeSwitch

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})