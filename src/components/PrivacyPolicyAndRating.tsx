import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeChange } from '../apptheme/ThemeChange';

const PrivacyPolicyAndRating = ({ currentType }: any) => {
    const useCustomTheme = useThemeChange()


    //Privacy Policy Handler 
    const handlePrivacyPolicy = () => {
        const url = 'https://sites.google.com/view/thinkappstudioprivacypolicy'
        Linking.openURL(url).catch(() => {
            Alert.alert("Error", "Unable to open the URL.");
        });
    }

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header, borderRadius: 10, }}>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Rate</Text>
                <TouchableOpacity>
                    <MaterialIcons name="navigate-next" size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Share with Friends</Text>
                <TouchableOpacity>
                    <MaterialIcons name="navigate-next" size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Privacy Policy</Text>
                <TouchableOpacity
                    onPress={handlePrivacyPolicy}
                >
                    <MaterialIcons name="navigate-next" size={24} color="grey" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PrivacyPolicyAndRating
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    btnText: {
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    rowText: {
        fontWeight: 'bold',
    },
})