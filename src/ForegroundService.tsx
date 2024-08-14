import BackgroundService from 'react-native-background-actions';
import Progress from './components/homeScreen/Progress';
import { useContext } from 'react';
import { AppContext } from './contextApi/AppContext';
import { Pedometer } from 'expo-sensors';


const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

// Define the intensive task that will run in the background



const veryIntensiveTask = async (taskDataArguments: { delay: number; currentStepCount: number }) => {
    const { delay } = taskDataArguments;
    await new Promise<void>(async (resolve) => {
        while (BackgroundService.isRunning()) {
            console.log(`Current step count:`);
            await sleep(delay);
            
        }
        resolve(); // Resolve the promise when the loop exits
    });
};

// Define options for the background service
const options = {
    taskName: 'StepCountingService',
    taskTitle: 'Step Counting',
    taskDesc: 'Counting steps in the background...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#2ecc71',
    linkingURI: 'yourapp://home', // Deep linking URI
    parameters: {
        delay: 60000, // Delay in milliseconds
    },
};

// Start the background service with the step counting task
export const startStepCountingService = async (currentStepCount: number) => {
    // options.parameters.currentStepCount = currentStepCount; // Update the current step count
    await BackgroundService.start(veryIntensiveTask, options);
};

// Update the notification with the latest iteration value
export const updateService = async (currentStepCount: number, caloriesBurned: any) => {
    await BackgroundService.updateNotification({
        taskDesc: `Current step count: ${currentStepCount} ,  Calories: ${caloriesBurned}`
    });
};

// Stop the background service
export const stopService = async () => {
    await BackgroundService.stop();
};
