import { View, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TargetModal from '../TargetModal';
import { Pedometer } from 'expo-sensors';
import { AppContext } from '../../contextApi/AppContext';
import DataBaseInitialization from '../../sqLiteDb/DataBaseInitialization';
import { useDatabase } from '../../sqLiteDb/useDatabase';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { updateService } from '../../ForegroundService';


const BACKGROUND_FETCH_TASK = 'background-fetch';





const Progress = ({ setCurrentStepCount, currentStepCount, kcal, distance, setKcal, setDistance, target, setTarget }: any) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [IsTargetReached, setIsTargetReached] = useState<any>(false);


    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);

    useEffect(() => {
        const updateBackground = async () => {
            await updateService(currentStepCount, kcal)
        }
        updateBackground()
    }, [currentStepCount, kcal])
    // async function registerBackgroundFetchAsync() {
    //     console.log(`Registering background fetch`)
    //     return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    //         minimumInterval: 60, // 1 min for android
    //         stopOnTerminate: false, // android only,
    //         startOnBoot: true, // android only
    //     });
    // }


    // TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    //     const now = Date.now();

    //     console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    //     await countStepsInBackground()
    //     // Be sure to return the successful result type!
    //     return BackgroundFetch.BackgroundFetchResult.NewData;
    // });

    // async function unregisterBackgroundFetchAsync() {
    //     return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    // }

    // useEffect(() => { registerBackgroundFetchAsync() }, [])

    useEffect(() => {
        if (currentStepCount >= target) {
            setCurrentStepCount(target)
            setIsTargetReached(true);
        }
        else {
            setIsTargetReached(false);
        }
        // console.log("Inside Target:state", state);
    }, [target, currentStepCount]);



    //     updateFootStepRecord(dateOnly, currentStepCount, target, kcal, distance)
    //     getData(dateOnly)
    // }, [currentStepCount, kcal, distance])


    // const initialLoad = async () => {
    //     console.log("initialLoad")
    //     try {
    //         const res: any = await getData(dateOnly);
    //         console.log('========', res)
    //         if (res && res.length > 0) {
    //             setCurrentStepCount(res[0].footsteps);
    //             setKcal(res[0].energy);
    //             setDistance(res[0].distance);
    //             setTarget(res[0].goal);
    //         } else {
    //             // If no data for the current date, insert a new row
    //             insertData(dateOnly, currentStepCount, kcal, distance).then(() => {
    //                 // console.log('New data inserted for the current date');
    //             }).catch(error => {
    //                 console.error('Error inserting new data:', error);
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Failed to load initial data', error);
    //     }
    // };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const newNow = new Date();
    //         const newDateOnly = newNow.toLocaleDateString();
    //         if (newDateOnly !== dateOnly) {
    //             insertData(newDateOnly, currentStepCount, kcal, distance).then(() => {
    //                 // console.log('Data inserted successfully');
    //             }).catch(error => {
    //                 console.error('Error inserting data:', error);
    //             });
    //             setCurrentStepCount(0); // Reset the steps for the new day
    //         }
    //     }, 60000); // Check every minute

    //     return () => clearInterval(interval); // Clean up the interval on unmount
    // }, [dateOnly]);

    const openTargetModal = () => {
        setModalVisible(!modalVisible)
    }

    const countStepsInBackground = async () => {
        console.log("CountStepsInBackground")
        await updateService(currentStepCount, kcal)
        Pedometer.watchStepCount((result) => {
            console.log("result", result.steps)
            setCurrentStepCount((preCount: any) => {
                console.log("preCount", preCount);
                const newCount = preCount > 1 ? result.steps + preCount - 1 : result.steps;
                // const newCount = result.steps;

                if (newCount >= target) {
                    setIsTargetReached(true);
                    return target;
                }
                return newCount;
            });
        });
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
            console.log("result", result.steps)
            setCurrentStepCount((preCount: any) => {
                console.log("preCount", preCount);
                const newCount = preCount > 1 ? result.steps + preCount - 1 : result.steps;
                // const newCount = result.steps;

                if (newCount >= target) {
                    setIsTargetReached(true);
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
        <View style={styles.container}>
            <View style={styles.btnView}>
                <TargetModal modalVisible={modalVisible} setModalVisible={setModalVisible} target={target} setTarget={setTarget} />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={openTargetModal}
                >
                    <Text style={styles.btnText}>edit</Text>
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
                activeStrokeColor={'#2ecc71'}
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
                    <TouchableOpacity onPress={() => { setCurrentStepCount(currentStepCount + 1) }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{currentStepCount}</Text>
                    </TouchableOpacity>
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
