import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,

    }),
});

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const newdataf = 'Usman Khalil' + Math.random();
    try {
        // const reminderTime: any = await AsyncStorage.getItem('reminderTime');
        // const reminderFlag = await AsyncStorage.getItem('reminderFlag');

        // // Parse the reminderTime to an integer
        // const reminderTimeInt = parseInt(reminderTime, 10);
        // const currentTime = new Date().getTime();

        // // Log current and reminder times for debugging
        // console.log('Reminder Time:', reminderTimeInt);
        // console.log('Current Time:', currentTime);

        // // Check if both reminderFlag is true and the current time is within the margin of the reminder time
        // const timeMargin = 60000; // 1-minute margin (adjust as needed)
        // if (reminderFlag === 'true' && Math.abs(currentTime - reminderTimeInt) <= timeMargin) {
        //     await Notifications.scheduleNotificationAsync({
        //         content: {
        //             title: "Reminder \u{1F463}",
        //             body: "It's time to do something \u{1F525}!!!!!",
        //         },
        //         trigger: null,
        //     });
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Reminder \u{1F463}",
                body: "It's time to do something \u{1F525}!!!!!",
            },
            trigger: null,
        });
        // }
    } catch (error) {
        console.error('Background fetch failed', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function registerBackgroundFetchAsync() {
    console.log('background Registration');
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60, // 1-minute interval
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
