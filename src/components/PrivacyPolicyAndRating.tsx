import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert, Share } from 'react-native'
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
    //OnShare Hanlder
    const Onshare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Checkout ThinkApp Studio on App Store! \n' +
                    'https://apps.apple.com/us/app/thinkapp-studio/id1552740306?ls=1',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("ShareActionResult", result)
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert("Error", "Unable to share the app.");
        }
    }
    //Rat us Hander
    const openPlayStore = async () => {
        const packageName = ''
        const url = `https://play.google.com/store`
        Linking.openURL(url).catch(err => {
            console.error("Failed to open Play Store", err);
            // Show alert when the URL cannot be opened
            Alert.alert(
                "Error",
                "Unable to open the Play Store. Please check your internet connection or try again later.",
                [{ text: "OK" }]
            );
        });
    }

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header, borderRadius: 10, }}>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Rate Us</Text>
                <TouchableOpacity onPress={openPlayStore}>
                    <MaterialIcons name="navigate-next" size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ ...styles.rowText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>Share with Friends</Text>
                <TouchableOpacity onPress={Onshare}>
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