import { Pedometer } from 'expo-sensors';
import BackgroundService from 'react-native-background-actions';
import { useDatabase } from '../sqLiteDb/useDatabase';
import { useState } from 'react';

const StepCountingServiceComponent = () => {
    const { getData, updateFootStepRecord } = useDatabase();
    const [stepFlag, setStepsFlag] = useState<boolean>(true)
    const dateOnly = new Date().toLocaleDateString();

    const sleep = (time: number | undefined) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
    const stepCountingInBackground = async () => {
        console.log('Date inBackground', dateOnly);

        // const res: any = await getData(dateOnly);
        // console.log('stepCountingInBackground', res)
        // const currentData = res && res.length > 0 ? res[0] : { footsteps: 0, energy: 0, distance: 0, goal: 100 };
        // console.log("currentData: ", currentData);
        // if (currentData.footsteps < currentData.goal) {
        //     const newSteps = currentData.footsteps + 1
        //     console.log("newSteps: ", newSteps);
        //     const updatedCount = newSteps;
        //     const updatedEnergy: any = calculateEnergy(updatedCount).toFixed(2);  // Implement this based on your calculation logic
        //     const updatedDistance: any = calculateDistance(updatedCount).toFixed(3); // Implement this based on
        //     await updateFootStepRecord(dateOnly, updatedCount, currentData.goal, updatedEnergy, updatedDistance);
        //     setStepsFlag(false)

        // }

        // if (newSteps < currentData.goal) {

        // Update database with new values
        // }
        return Pedometer.watchStepCount(async (result) => {
            // Fetch current state directly from the database
            const res: any = await getData(dateOnly);
            const currentData = res && res.length > 0 ? res[0] : { footsteps: 0, energy: 0, distance: 0, goal: 10000 };
            console.log("currentData: ", currentData);
            const newSteps = result.steps;
            console.log("newSteps: ", newSteps);
            // if (newSteps < currentData.goal) {
            const updatedCount = newSteps;
            const updatedEnergy: any = calculateEnergy(updatedCount).toFixed(2);  // Implement this based on your calculation logic
            const updatedDistance: any = calculateDistance(updatedCount).toFixed(3)
            // Update database with new values
            setStepsFlag(false)
            await updateFootStepRecord(dateOnly, updatedCount, currentData.goal, updatedEnergy, updatedDistance);
            // }
        });

    };

    const calculateEnergy = (steps: number) => {
        console.log("stepppp", steps)
        return steps * 0.05;
    };

    const calculateDistance = (steps: number) => {
        console.log("stepppp", steps)
        return (steps * 0.6) / 1000;
    };

    const updatingStepsInBackground = async () => {
        try {
            const res = await getData(dateOnly);
            console.log("Updating steps in background", res)
            if (res && res.length > 0) {
                const { footsteps, energy, goal, }: any = res[0];
                if (BackgroundService.isRunning()) {
                    await updateServiceNotification(footsteps, energy, goal);
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
                // await stepCountingInBackground()
                await updatingStepsInBackground();
                await sleep(delay);
            }
            resolve();
        });

        (await pedometerSubscription)?.remove();
    };
    const updateServiceNotification = async (steps: number, calories: number, goal: number) => {
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
                delay: 60000, // Delay in milliseconds
            },
            progressBar: {
                max: currentData.goal, // Set the maximum value to the goal
                value: currentData.footsteps, // Set the current value to the footsteps
                // indeterminate: true,
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
        setStepsFlag(true)
        await BackgroundService.stop();
        console.log('StopService--------------------------------Ending----------------------------------');
    };

    return {
        stopService,
        startService,
    }
};

export default StepCountingServiceComponent;