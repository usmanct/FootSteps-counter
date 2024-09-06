import { StyleSheet, Text, TouchableWithoutFeedback , View, Image } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';

const Bmi = () => {

    const { currentType }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()

    const navigation = useNavigation();
    const navigateToBMI = () => {
        navigation.navigate('BmiCalculations' as never)
    }

    return (
        <View style={styles.maincontainer}>
            {/* <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Watch ads</Text>
                </TouchableOpacity>
            </View> */}
            <TouchableWithoutFeedback  onPress={navigateToBMI}>
                <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bmiButton : useCustomTheme.lightMode.bmiButton }}>
                    <Image
                        source={require('../../../assets/homeScreenAssets/bmi_calculate_icon.png')}
                        style={{ height: 60, width: 100 }}
                    />
                    <Text
                        style={{
                            fontSize: 20, fontWeight: 'bold',
                            color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text
                        }}>
                        BMI Calculate
                    </Text>
                    <AntDesign name="right" size={25} color={currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Bmi

const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: 5,
        gap: 15,
        paddingHorizontal: 10,
    },
    container: {

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

        // marginTop: 5,
        paddingVertical: 10,
        gap: 15,
        paddingHorizontal: 10,
        backgroundColor: "#f3eff8",
        borderRadius: 10
    },
    btnView: {
        justifyContent: 'flex-end',
        // backgroundColor: 'lightgreen',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        backgroundColor: 'orange',
        borderTopRightRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 3,

    },
    btnText: {
        fontSize: 12,
        fontWeight: 'bold',

    }


})