// BackgroundTasks.js
import * as TaskManager from 'expo-task-manager';
import { Pedometer } from 'expo-sensors';
import { useDatabase } from '../sqLiteDb/useDatabase';

const { insertData, updateFootStepRecord , getData } = useDatabase();

const STEP_COUNTER_TASK = 'STEP_COUNTER_TASK';

TaskManager.defineTask(STEP_COUNTER_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Error with task:', error);
    return;
  }

  if (data) {
    const { steps } : any = data;
    const now = new Date();
    const dateOnly = now.toLocaleDateString();

    // Update the step count in your database
    try {
      const res = await getData(dateOnly);
      if (res && res.length > 0) {
        // Update existing record
        updateFootStepRecord(dateOnly, steps);
      } else {
        // Insert new record
        insertData(dateOnly, steps, 0, 0); // Adjust kcal and distance as needed
      }
    } catch (error) {
      console.error('Failed to update step count in background', error);
    }
  }
});

export const registerStepCounterTask = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(STEP_COUNTER_TASK);
  if (!isRegistered) {
    await TaskManager.registerTaskAsync(STEP_COUNTER_TASK, {
      minimumInterval: 60, // seconds
      stopOnTerminate: false,
      startOnBoot: true,
    });
  }
};

