import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const BmiResult = ({ route }) => {
    const navigation = useNavigation();
    const { res } = route.params;

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
        <View style={styles.container}>
            <Text style={styles.heading}>BMI Calculator</Text>
            <Text style={styles.subHeading}>BMI Score</Text>
            <Text style={styles.resultText}>{score}</Text>
            <Text style={{ ...styles.subHeading, fontSize: 20, fontWeight: 'bold' }}>{remarks.a}</Text>
            <View>
                <View style={styles.subContainer}>
                    <Text style={styles.commentText}>
                        {remarks.b}
                    </Text>
                </View>
            </View>
            <View style={styles.btnRow}>
                <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={() => {
                        navigation.navigate('Home' as never)
                    }}
                >
                    <Text style={styles.resultBtnText}>Back to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={() => {
                        navigation.navigate('BmiCalculations' as never)
                    }}
                >
                    <Text style={styles.resultBtnText}>Calculate Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BmiResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },
    subContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 10,
        width: '100%',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 15,
        marginBottom: 20,
        color: 'grey',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    btnText: {
        fontSize: 14,
        color: 'grey',
    },
    rowText: {
        fontWeight: 'bold',
    },
    resultBtn: {
        backgroundColor: '#0cf249',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    resultBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#0cf249'
    },
    commentText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0cf249'
    },
    btnRow: {
        alignItems: 'center',
    }




})