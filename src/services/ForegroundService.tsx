import { Pedometer } from 'expo-sensors';
import BackgroundService from 'react-native-background-actions';
import { useDatabase } from '../sqLiteDb/useDatabase';
import { useState } from 'react';

const StepCountingServiceComponent = () => {
    const { getData, updateFootStepRecord } = useDatabase();
    const [stepFlag, setStepsFlag] = useState<boolean>(true)
    const dateOnly = new Date().toLocaleDateString();

    const sleep = (time: number | undefined) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

    const stepCountingInBackground = () => {
        console.log('stepCountingInBackground');
        return Pedometer.watchStepCount(async (result) => {

            // Fetch current state directly from the database
            const res: any = await getData(dateOnly);
            const currentData = res && res.length > 0 ? res[0] : { footsteps: 0, energy: 0, distance: 0, goal: 10000 };
            console.log("currentData: ", currentData);
            const newSteps = stepFlag ? currentData.footsteps + result.steps -1 : result.steps;
            console.log("newSteps: ", newSteps);
            // if (newSteps < currentData.goal) {
            const updatedCount = newSteps;
            const updatedEnergy: any = calculateEnergy(updatedCount).toFixed(2);  // Implement this based on your calculation logic

            // Update database with new values
            setStepsFlag(false)
            await updateFootStepRecord(dateOnly, updatedCount, currentData.goal, updatedEnergy, currentData.distance);
            // }
        });
    };

    const calculateEnergy = (steps: number) => {
        console.log("stepppp", steps)
        // Implement your energy calculation logic here
        // Example: return steps * 0.005;
        return steps * 0.05;
    };
    const updatingStepsInBackground = async () => {
        try {
            const res = await getData(dateOnly);
            if (res && res.length > 0) {
                const { footsteps, energy }: any = res[0];
                if (BackgroundService.isRunning()) {
                    await updateServiceNotification(footsteps, energy);
                }
            }
        } catch (error) {
            console.error("Failed to update data in the background", error);
        }
    };

    const veryIntensiveTask = async (taskDataArguments: { delay: number; }) => {
        const { delay } = taskDataArguments;
        const pedometerSubscription = stepCountingInBackground();
        console.log("Usman_______________________")
        await new Promise<void>(async (resolve) => {
            while (BackgroundService.isRunning()) {
                await updatingStepsInBackground();
                await stepCountingInBackground()
                await sleep(delay);
            }
            resolve();
        });

        pedometerSubscription?.remove();
    };

    const updateServiceNotification = async (steps: number, calories: number) => {
        if (BackgroundService.isRunning()) {
            console.log('Updating notification');
            await BackgroundService.updateNotification({
                taskDesc: `Current step count: ${steps}, Calories: ${calories}`
            });
        }
    };

    const startService = async () => {
        console.log('startService--------------------------------');
        await BackgroundService.start(veryIntensiveTask, {
            taskName: 'StepCountingService',
            taskTitle: 'Step Counting',
            taskDesc: 'Counting steps in the background...',
            taskIcon: {
                name: 'ic_launcher',
                type: 'mipmap',
            },
            color: '#2ecc71',
            linkingURI: 'com.usmanct.FootStepscounter://home',
            parameters: {
                delay: 60000, // Delay in milliseconds
            }
        });
        console.log('startService--------------------------------Ending--------------------------------');
    };

    const stopService = async () => {
        console.log('StopService--------------------------------');
        setStepsFlag(true)
        await BackgroundService.stop();
        console.log('StopService--------------------------------Ending----------------------------------');
    };

    return {
        stopService,
        startService
    }
};

export default StepCountingServiceComponent;