import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TargetModal from '../TargetModal';
import { Pedometer } from 'expo-sensors';
import { useThemeChange } from '../../apptheme/ThemeChange';

const Progress = (
    {
        setCurrentStepCount,
        currentStepCount,
        target,
        setTarget,
        currentType
    }
        : any) => {

    const [modalVisible, setModalVisible] = useState(false);
    const useCustomTheme = useThemeChange()

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    // const [IsTargetReached, setIsTargetReached] = useState<any>(false);


    const now = new Date();
    const dateOnly = now.toLocaleDateString();

    //Updaeting the Notification in the Background
    // useEffect(() => {
    //     const updateBackground = async () => {
    //         await updateService(currentStepCount, kcal)
    //     }
    //     updateBackground()
    // }, [currentStepCount, kcal])


    // useEffect(() => {
    //     if (currentStepCount >= target) {
    //         setCurrentStepCount(target)
    //         setIsTargetReached(true);
    //     }
    //     else {
    //         setIsTargetReached(false);
    //     }
    //     // console.log("Inside Target:state", state);
    // }, [target, currentStepCount]);

    const openTargetModal = () => {
        setModalVisible(!modalVisible)
    }

    const countStepsInBackground = async () => {
        console.log("CountStepsInBackground")
        // await updateService(currentStepCount, kcal)
        // Pedometer.watchStepCount((result) => {
        //     console.log("result", result.steps)
        //     setCurrentStepCount((preCount: any) => {
        //         // console.log("preCount", preCount);
        //         // const newCount = preCount > 1 ? result.steps + preCount - 1 : result.steps;
        //         const newCount = result.steps;

        //         if (newCount >= target) {
        //             // setIsTargetReached(true);
        //             return target;
        //         }
        //         return newCount;
        //     });
        // });
    }

    useEffect(() => {
        let subscription;
        console.log("Subscription")
        // let lastSteps = 0;
        Pedometer.isAvailableAsync().then(
            (result) => {
                console.log("Availability--", result)
                setIsPedometerAvailable(String(result));
            },
            (error) => {
                setIsPedometerAvailable('Could not get availability: ' + error);
            }
        );
        Pedometer.requestPermissionsAsync().then((result) => {
            console.log("Availability", result)
        },
            (error) => {
                console.log("Could not get availability:", error)
            })
        subscription = Pedometer.watchStepCount((result) => {
            console.log("result", result.steps)
            setCurrentStepCount((preCount: any) => {
                console.log("preCount", currentStepCount);
                const newCount = result.steps;

                if (newCount >= target) {
                    // setIsTargetReached(true);
                    return target;
                }
                return newCount;
            });
        });
        return () => {
            subscription && subscription.remove();

        };
    }, []);


    return (
        <ImageBackground
            source={require('../../../assets/homeScreenAssets/back_ground.png')}
            style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : useCustomTheme.lightMode.bgcolor }}
            resizeMode="cover" // You can also use "contain" or other modes depending on the effect you want
        >

            <View style={styles.btnView}>
                <TargetModal modalVisible={modalVisible} setModalVisible={setModalVisible} target={target} setTarget={setTarget} currentType={currentType} />
                <TouchableOpacity
                    style={{ ...styles.btn, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Btn1 : useCustomTheme.lightMode.Btn1 }}
                    onPress={openTargetModal}
                >
                    <Text style={styles.btnText}>Edit</Text>
                    <AntDesign name="right" size={12} color="white" />
                </TouchableOpacity>
            </View>
            <CircularProgressBase
                key={target}
                value={currentStepCount}
                radius={100}
                duration={1000}
                maxValue={target}
                inActiveStrokeOpacity={currentType === 'dark' ? 1 : .5}
                activeStrokeColor={currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke}
                onAnimationComplete={() => {

                }
                }
            >
                <View
                    style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center'
                    }}>
                    {/* <Text>Icon</Text> */}
                    <Image
                        source={require('../../../assets/homeScreenAssets/step_icon.png')}
                        style={{ height: 55, width: 55 }}
                        resizeMode="contain"
                    />
                    <Text
                        style={
                            { fontSize: 14, fontWeight: 'bold', color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }
                        }
                    >
                        {dateOnly}
                    </Text>
                    <TouchableOpacity onPress={() => { setCurrentStepCount(currentStepCount + 1) }}>
                        <Text
                            style={
                                { fontSize: 15, fontWeight: 'bold', color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }
                            }>
                            {currentStepCount}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{ fontSize: 12, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }}
                    >
                        /{target}
                    </Text>
                </View>
            </CircularProgressBase>
            <Image
                source={require('../../../assets/homeScreenAssets/gift_icon.gif')}
                style={{ height: 70, width: 100, position: 'absolute', bottom: 0, right: 0 }}
            />
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        paddingVertical: 15,
        // borderRadius: 8,
        gap: 15,
        paddingHorizontal: 20,

    },
    btnView: {
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    btnText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    }
})

export default Progress 
