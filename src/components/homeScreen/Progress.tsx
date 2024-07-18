import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TargetModal from '../TargetModal';
import { Pedometer } from 'expo-sensors';
import { datadb } from '../../sqLiteDb/Connection';
import { AppContext } from '../../contextApi/AppContext';
const Progress = ({ setCurrentStepCount, currentStepCount }) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [target, setTarget] = useState(10)
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [IstargetUpdate, setIstargetUpdate] = useState<any>(true)
    const [IsTargetReached, setIsTargetReached] = useState<any>(false);
    const  { state, setState } : any  = useContext(AppContext);


   

    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const props = {

    }
    useEffect(() => {
        setIsTargetReached(false);
        setIstargetUpdate(true)
        if (currentStepCount >= target) {
            setCurrentStepCount(target)
            setIsTargetReached(true);
        }
        if (IsTargetReached) {
            setCurrentStepCount(0)
            setIsTargetReached(false);
        }
    }, [target]);
    const openTargetModal = () => {
        setModalVisible(!modalVisible)
    }
    useEffect(() => {
        let subscription;
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
            if (IstargetUpdate) {
                console.log('Before', IstargetUpdate)
                setIstargetUpdate(false);
                console.log('Target was just updated', IstargetUpdate)
            
                return;
            }
            console.log('Steps', result.steps)
            if (!IsTargetReached) {
                setCurrentStepCount((preCount) => {
                    const newCount = preCount + result.steps
                    if (newCount >= target) {
                        setIsTargetReached(true);
                        return target;
                    }
                    return newCount;
                });
                // setIsTargetReached(true);
                // lastSteps = result.steps;
                // if (lastSteps >= target) {
                //     console.log('1111')
                //     setCurrentStepCount(target)
                //     setIsTargetReached(true);
                // }
            }
        });
        
        //  datadb(state)
        return () => {
            subscription && subscription.remove();
        };
    }, [IsTargetReached, target, IstargetUpdate]);



    return (
        <View style={styles.container}>
            <View style={styles.btnView}>
                <TargetModal modalVisible={modalVisible} setModalVisible={setModalVisible} target={target} setTarget={setTarget} />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={openTargetModal}
                >
                    <Text style={styles.btnText}>Edit</Text>
                    <AntDesign name="right" size={12} color="black" />
                </TouchableOpacity>
            </View>
            <CircularProgressBase
                key={target}
                value={currentStepCount}
                radius={100}
                duration={1000}
                maxValue={target}
                inActiveStrokeOpacity={.5}
                activeStrokeColor={IsTargetReached ? 'grey' : '#2ecc71'}
                {...props}
                onAnimationComplete={() => {

                }
                }
            >
                <View
                    style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center'
                    }}>
                    {/* <Text>Icon</Text> */}
                    <MaterialCommunityIcons name="shoe-cleat" size={24} color="grey" />
                    <Text style={{ fontSize: 12, }}>{dateOnly}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{currentStepCount}</Text>
                    <Text style={{ fontSize: 12, }}>/{target}</Text>
                    {/* <Text onPress={() => setIsSimulating(!isSimulating)}>
                        {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                    </Text> */}

                </View>

            </CircularProgressBase>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 15,
        paddingHorizontal: 10,
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
        borderWidth: 1,
        borderRadius: 360,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    btnText: {
        fontSize: 12,
    }


})

export default Progress