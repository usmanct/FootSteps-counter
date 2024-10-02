import { Pedometer } from 'expo-sensors';
import BackgroundService from 'react-native-background-actions';
import { useDatabase } from '../sqLiteDb/useDatabase';
import { useState } from 'react';

const StepCountingServiceComponent = () => {
    const { getData, updateFootStepRecord } = useDatabase();
    const dateOnly = new Date().toLocaleDateString();
    let preResult = 0; // Initialize preResult to store previous step count

    const sleep = (time: any) => new Promise((resolve) => setTimeout(resolve, time));

    const stepCountingInBackground = async () => {
        return Pedometer.watchStepCount(async (result) => {
            console.log('Step Count: ', result.steps);

            // Fetch current state directly from the database
            const res: any = await getData(dateOnly);
            const currentData = res && res.length > 0 ? res[0] : null;

            if (currentData) {
                // Calculate new step count
                const updatedCount = currentData.footsteps + result.steps - preResult;

                // Update preResult to current step count for the next callback
                preResult = result.steps;

                // Update existing record for the day
                console.log("currentData: ", currentData);
                const updatedEnergy = calculateEnergy(updatedCount).toFixed(2);
                const updatedDistance = calculateDistance(updatedCount).toFixed(3);

                await updateFootStepRecord(dateOnly, updatedCount, currentData.goal, updatedEnergy, updatedDistance);
            }
        });
    };

    const calculateEnergy = (steps: any) => {
        console.log("stepppp", steps);
        return steps * 0.05; // Example calculation
    };

    const calculateDistance = (steps: any) => {
        console.log("stepppp", steps);
        return (steps * 0.6) / 1000; // Example calculation
    };

    const updatingStepsInBackground = async () => {
        try {
            const res: any = await getData(dateOnly);
            console.log("Updating steps in background", res);
            if (res && res.length > 0) {
                const { footsteps, energy, goal } = res[0];
                if (BackgroundService.isRunning()) {
                    await updateServiceNotification(footsteps, energy, goal);
                }
            }
        } catch (error) {
            console.error("Failed to update data in the background", error);
        }
    };

    const veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        const pedometerSubscription = stepCountingInBackground();

        await new Promise<void>(async (resolve) => {
            while (BackgroundService.isRunning()) {
                await updatingStepsInBackground();
                await sleep(delay);
            }
            resolve();
        });

        pedometerSubscription?.remove();
    };

    const updateServiceNotification = async (steps: any, calories: any, goal: any) => {
        if (BackgroundService.isRunning()) {
            console.log('Updating notification');
            await BackgroundService.updateNotification({
                taskDesc: `Steps \u{1F463}: ${steps} , Calories \u{1F525} :${calories}`,
                progressBar: {
                    max: goal,
                    value: steps, // Update this value with the new footstep count
                }
            });
        }
    };

    const startService = async () => {
        console.log('startService--------------------------------');

        // Fetch current data to get the goal and footsteps
        const res: any = await getData(dateOnly);
        const currentData = res && res.length > 0 ? res[0] : { footsteps: 0, goal: 10000 };

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
                delay: 5000, // Delay in milliseconds
            },
            progressBar: {
                max: currentData.goal, // Set the maximum value to the goal
                value: currentData.footsteps, // Set the current value to the footsteps
                accentColor: '#2ecc71',
                color: '#2ecc71',
                progressBackgroundColor: '#f5f5f5',
                showProgress: true,
            }
        });

        console.log('startService--------------------------------Ending--------------------------------');
    };

    const stopService = async () => {
        console.log('StopService--------------------------------');
        await BackgroundService.stop();
        console.log('StopService--------------------------------Ending----------------------------------');
    };

    return {
        stopService,
        startService,
    };
};

export default StepCountingServiceComponent;
