import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { useThemeChange } from '../apptheme/ThemeChange';

const Loader = ({ currentType }: any) => {
    const useCustomTheme = useThemeChange();
    return (
        <View style={{
            ...styles.loaderContainer,
            backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : 'white'
        }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}
export default Loader
const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
