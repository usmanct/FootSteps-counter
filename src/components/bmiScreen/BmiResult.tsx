import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState , memo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../contextApi/AppContext';
import { useThemeChange } from '../../apptheme/ThemeChange';
const BmiResult = ({ route }: any) => {
    const navigation = useNavigation();
    const { res } = route.params;
    const { currentType }: any = useContext(AppContext)
    const useCustomTheme = useThemeChange()
    const [score, setScore] = useState(23.5)
    const [remarks, setRemarks] = useState({
        a: 'Normal',
        b: "Normal weight: Great job! Continue maintaining your healthy lifestyle.",
    })

    const bmiComments = [
        "It's important to eat a balanced diet and maintain a healthy weight. Consider consulting with a healthcare provider.",
        "Great job! Continue maintaining your healthy lifestyle.",
        "Consider adopting a balanced diet and regular exercise to reach a healthier weight. Consult with a healthcare provider if needed.",
        "It's important to take steps towards a healthier weight. Consider consulting with a healthcare provider for guidance.",
        "A healthier weight can significantly improve your well-being. Consider seeking advice from a healthcare provider.",
        "It's crucial to address this for your overall health. Consult with a healthcare provider to develop a plan."
    ];

    useEffect(() => {
        setScore(res)
        if (res < 18.1) {
            setRemarks({ a: "Underweight", b: bmiComments[0] })
        }
        else if (res < 25.0) {
            setRemarks({ a: "Normal weight", b: bmiComments[1] })
        }
        else if (res < 30.0) {
            setRemarks({ a: "Overweight", b: bmiComments[2] })
        }
        else if (res < 35.0) {
            setRemarks({ a: "Obesity Class I", b: bmiComments[3] })
        }
        else if (res < 40.0) {
            setRemarks({ a: "Obesity Class II", b: bmiComments[4] })
        }
        else {
            setRemarks({ a: "Obesity Class III", b: bmiComments[5] })
        }
    }, [])

    return (
        <View style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : "white" }}>
            <Image
                source={require('../../../assets/homeScreenAssets/bmi_calculate_icon.png')}
                style={{ height: 90, width: 90 }}
                resizeMode='contain'
            />
            <Text style={{ ...styles.heading, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>BMI Calculator</Text>
            <Text style={styles.subHeading}>BMI Score</Text>
            <View style={{ ...styles.subContainer, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
                <Text style={{ ...styles.resultText, color: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : '#fc5c74' }}>{score}</Text>
                <Text style={{ ...styles.subHeading, fontSize: 20, fontWeight: 'bold' }}>{remarks.a}</Text>
                <View>
                    <View style={{ ...styles.remarksContainer, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : '#ded8e8', borderWidth: currentType === 'dark' ? 2 : 0, borderColor: currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : '' }}>
                        <Text style={{ ...styles.commentText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}>
                            {remarks.b}
                        </Text>
                    </View>
                </View>
                <View style={styles.btnRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelBtn]}
                        onPress={() => {
                            navigation.navigate('Home' as never)
                        }}
                    >
                        <Text style={styles.textStyle}>Back to Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.saveBtn, { backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.lightMode.Btn1 }]}
                        onPress={() => {
                            navigation.navigate('BmiCalculations' as never)
                        }}
                    >
                        <Text style={styles.textStyle}>Calculate Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default memo(BmiResult)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    subContainer: {
        borderRadius: 10,
        margin: 10,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remarksContainer: {
        borderRadius: 10,
        margin: 10,
        width: '100%',
        padding: 20,
    }
    ,
    heading: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 20,
        marginBottom: 20,
        color: 'grey',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#f49913',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    saveBtn: {
        backgroundColor: '#f49913',
    },
    cancelBtn: {
        backgroundColor: '#0fb4fc',
    },
    resultText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    commentText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnRow: {
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
})