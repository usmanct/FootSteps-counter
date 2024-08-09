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
        const reminderTime = await AsyncStorage.getItem('reminderTime');
        const reminderFlag = await AsyncStorage.getItem('reminderFlag');
        const shouldSendNotification = true; // Replace with actual logic

        if (shouldSendNotification) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Reminder",
                    body: "It's time to do something!",
                },
                trigger: null,
            });
        }

        return newdataf ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        console.error('Background fetch failed', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function registerBackgroundFetchAsync() {
    console.log('background Registration')
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 1, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
