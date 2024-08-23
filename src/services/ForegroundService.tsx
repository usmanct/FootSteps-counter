import React, { useContext } from 'react';
import { Pedometer } from 'expo-sensors';
import BackgroundService from 'react-native-background-actions';
import { AppContext } from '../contextApi/AppContext';
import { useDatabase } from '../sqLiteDb/useDatabase';

const StepCountingServiceComponent = () => {
    const { getData, updateFootStepRecord } = useDatabase();
    const dateOnly = new Date().toLocaleDateString();

    const sleep = (time: number | undefined) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

    const stepCountingInBackground = () => {
        console.log('stepCountingInBackground');
        return Pedometer.watchStepCount(async (result) => {
            const newSteps = result.steps;
            console.log("newSteps: ", newSteps);
            // Fetch current state directly from the database
            const res: any = await getData(dateOnly);
            const currentData = res && res.length > 0 ? res[0] : { footsteps: 0, energy: 0, distance: 0, goal: 10000 };
            console.log("currentData: ", currentData);
            // if (newSteps < currentData.goal) {
            const updatedCount = newSteps ;
            const updatedEnergy: any = calculateEnergy(updatedCount).toFixed(2);  // Implement this based on your calculation logic

            // Update database with new values
            await updateFootStepRecord(dateOnly, updatedCount, currentData.goal, currentData.distance, updatedEnergy);
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
            await BackgroundService.updateNotification({
                taskDesc: `Current step count: ${steps}, Calories: ${calories}`
            });
        }
    };

    const startService = async () => {
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
    };

    const stopService = async () => {
        await BackgroundService.stop();
    };

    return {
        stopService,
        startService
    }
};

export default StepCountingServiceComponent;