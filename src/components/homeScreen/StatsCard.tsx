import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useThemeChange } from '../../apptheme/ThemeChange'
import { AppContext } from '../../contextApi/AppContext'

const StatsCard = (
    {
        icon,
        value,
        unit,
        isFirst,
        letsRunScreen,
        timeReached,
        kcalAchieve,
        distanceAchieve
    }: any) => {

    const { currentType }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()

    return (
        <View style={
            {
                ...styles.container,
                width: letsRunScreen ? '25%' : '33%',
                backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header
            }}
        >
            <Text style={
                {
                    fontWeight: 'bold',
                    color: timeReached || kcalAchieve || distanceAchieve ? 'red' : currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                }
            }>
                {value}
            </Text>
            <Text style={{ ...styles.label, color: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : '#8d8891' }}>
                {unit}
            </Text>
            <Image
                source={icon}
                style={{ width: 40, height: 40 }}
                resizeMode='contain'
            />
        </View>
    )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3eff8',
        alignItems: 'center',
        gap: 7,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 15,
    },
    firstContainer: {
        borderLeftWidth: 0,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',

    }
})