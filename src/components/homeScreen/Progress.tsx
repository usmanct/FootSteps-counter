import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { AntDesign } from '@expo/vector-icons';
import TargetModal from '../TargetModal';
import { Pedometer } from 'expo-sensors';
import { useThemeChange } from '../../apptheme/ThemeChange';
import StepCountingServiceComponent from '../../services/ForegroundService';

const Progress = (
    {
        setCurrentStepCount,
        currentStepCount,
        target,
        setTarget,
        currentType,
        setInitialUpdateflag,
        showOverLay,
        setShowOverLay,
    }
        : any) => {

    //Target Data for Setting the Target        
    const data: any = [
        500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500,
        6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500,
        11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500,
        16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000
    ]
    const useCustomTheme = useThemeChange()
    const { startService, stopService } = StepCountingServiceComponent()
    let subscription: any;
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [modalVisible, setModalVisible] = useState(false);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [defaultIndex, setDefaultIndex] = useState<any>(0)
    useEffect(() => {
        if (currentStepCount >= target) {
            setCurrentStepCount(target)
        }
    }, [target, currentStepCount]);
    //Setting the Default Value to the Modal 
    useEffect(() => {
        setDefaultIndex(data.indexOf(target))
    }, []);
    useEffect(() => {
        let preResult: number
        Pedometer.isAvailableAsync().then(
            (result) => {
                setIsPedometerAvailable(String(result));
                console.log("Pedometer is Available")
            },
            (error) => {
                setIsPedometerAvailable('Could not get availability: ' + error);
            }
        );
        Pedometer.requestPermissionsAsync().then((result) => {
            setInitialUpdateflag(true);
        },
            (error) => {
                console.log("Could not get availability:", error)
            })
        subscription = Pedometer.watchStepCount((result) => {
            setCurrentStepCount((preCount: any) => {
                console.log("PreCount: ", preCount)
                console.log("Stepsss From", preResult)
                const newCount: any = preCount + (result.steps - preResult) || 0;
                console.log("NewCount: ", newCount);
                console.log("Steps: ", result.steps);
                preResult = result.steps;
                if (newCount >= target) {
                    return target;
                }
                return newCount;
            });
            stopService()
        });
        return () => {
            subscription && subscription.remove();
            setInitialUpdateflag(true)

        };
    }, []);
    //Opening the Target Modal
    const openTargetModal = () => {
        setModalVisible(!modalVisible)
        setShowOverLay(!showOverLay)
        console.log('open target modal')
    }
    return (
        <ImageBackground
            source={require('../../../assets/homeScreenAssets/back_ground.png')}
            style={{ ...styles.container, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.bgcolor : useCustomTheme.lightMode.bgcolor }}
            resizeMode="cover" // You can also use "contain" or other modes depending on the effect you want
        >
            <View style={styles.btnView}>
                <TargetModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    target={target}
                    setTarget={setTarget}
                    currentType={currentType}
                    showOverLay={showOverLay}
                    setShowOverLay={setShowOverLay}
                    data={data}
                    defaultIndex={defaultIndex}
                    setDefaultIndex={setDefaultIndex}
                />
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
                inActiveStrokeOpacity={1}
                inActiveStrokeColor={currentType === 'dark' ? useCustomTheme.darkMode.inActiveStroke : useCustomTheme.lightMode.inActiveStroke}
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
                source={require('../../../assets/homeScreenAssets/running_gif.gif')}
                style={{ height: 70, width: 100, position: 'absolute', bottom: 0, right: 0 }}
            />
        </ImageBackground>
    )
}
export default memo(Progress)
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        gap: 15,
        paddingHorizontal: 20,
    },
    btnView: {
        justifyContent: 'flex-end',
        width: '100%',
        flexDirection: 'row',

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 5,
        borderColor: 'black',
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