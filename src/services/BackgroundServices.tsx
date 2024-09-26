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
const WATER_REMINDER_TASK = 'water-reminder';

TaskManager.defineTask(WATER_REMINDER_TASK, async () => {
    try {
        const waterFlag = await AsyncStorage.getItem('waterReminderFlag')
        const startTime = await AsyncStorage.getItem('startTime')
        const upperBound = startTime ? JSON.parse(startTime) : { h: null, m: null };
        const endTime = await AsyncStorage.getItem('endTime')
        const lowerBound = endTime ? JSON.parse(endTime) : { h: null, m: null };
        const currentTime = new Date();

        const startTimeHours = Number(upperBound.h);
        const startTimeMins = Number(upperBound.m);

        const endTimeHours = Number(lowerBound.h);
        const endTimeMins = Number(lowerBound.m);

        const currentTimeHours = Number(currentTime.getHours());
        const currentTimeMins = Number(currentTime.getMinutes());
        console.log("startTime", startTimeHours, startTimeMins)
        console.log("endTime", endTimeHours, endTimeMins)
        console.log("currentTime", currentTimeHours, currentTimeMins)
        if (
            waterFlag &&
            (currentTimeHours >= startTimeHours && currentTimeHours <= endTimeHours) &&
            (currentTimeHours !== startTimeHours || currentTimeMins >= startTimeMins) &&
            (currentTimeHours !== endTimeHours || currentTimeMins <= endTimeMins)
        ) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "💧 Hydration Reminder",
                    body: "Don't forget to drink water! Stay hydrated 🥤",
                },
                trigger: null,
            });
        }

    } catch (error) {
        console.error('Background fetch failed', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
})
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        const reminderTimeString = await AsyncStorage.getItem('reminderTime');
        const reminderTime = reminderTimeString ? JSON.parse(reminderTimeString) : { h: null, m: null };
        const reminderFlag = await AsyncStorage.getItem('reminderFlag');

        // Get current time
        const currentTime = new Date();

        const reminderHours = Number(reminderTime.h);
        const reminderMinutes = Number(reminderTime.m);
        console.log()

        if (isNaN(reminderHours) || isNaN(reminderMinutes)) {
            console.error('Invalid reminder time:', reminderTime);
            return; // Early exit if the time is invalid
        }

        // Calculate differences
        const hDifference = Number(currentTime.getHours()) - reminderHours;
        const mDifference = Number(currentTime.getMinutes()) - reminderMinutes;


        if (reminderFlag === 'true' && hDifference === 0 && mDifference === 0) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Reminder \u{1F463}",
                    body: `It's time to do something \u{1F525}!!!!! ${currentTime}`,
                },
                trigger: null,
            });
        }
    } catch (error) {
        console.error('Background fetch failed', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

//Running Reminder registration
export async function registerBackgroundFetchAsync() {

    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 20, // 1-minute interval
        stopOnTerminate: false,
        startOnBoot: true,
    });
}
//Running reminder Unregistration
export async function unregisterBackgroundFetchAsync() {

    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

//WaterTrack Reminder Task registister
export async function registerWaterreminderTask() {
    const timeInterval = await AsyncStorage.getItem('Interval')
    const NotificationTimeInterval = timeInterval ? JSON.parse(timeInterval) : { h: null, m: null };
    const reminderHours = Number(NotificationTimeInterval.h);
    const reminderMinutes = Number(NotificationTimeInterval.m) 
    
    const t  = 60 * 60 * reminderHours + 60 * reminderMinutes
    console.log('tttttt',t)
    return BackgroundFetch.registerTaskAsync(WATER_REMINDER_TASK, {
        minimumInterval: t, // 1-minute interval
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

//WaterTrack Reminder Task Unregister

export async function unregisterWaterReminderTask() {
    return BackgroundFetch.unregisterTaskAsync(WATER_REMINDER_TASK);
}