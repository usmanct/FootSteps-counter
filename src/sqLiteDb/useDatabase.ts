import * as SQLite from 'expo-sqlite';
import { useContext } from 'react';
import { AppContext } from '../contextApi/AppContext';

export const useDatabase = () => {
    const {
        setRecord,
        setWaterHistory,
    }: any = useContext(AppContext);
    const now = new Date();
    const dateOnly = now.toLocaleDateString();
    //Inserting the footsteps data into the data
    const insertData = async (s: string | number | boolean | Uint8Array | null, currentStepCount: string | number | boolean | Uint8Array | null, target: string | number | boolean | Uint8Array | null, kcal: string | number | boolean | Uint8Array | null, distance: string | number | boolean | Uint8Array | null) => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            await db.runAsync('INSERT INTO step_data (date, footsteps,goal, flag, distance, energy) VALUES (?, ?, ?,?, ?, ?)',
                s, currentStepCount, target, 1, distance, kcal);
        } catch (error) {
            console.error("Insertion Step Data Error", error);
        }

    };
    //Fetching the single Footstep data from the database
    const getData = async (s: any) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.getAllAsync('SELECT * FROM step_data WHERE date = ?', s);
            if (result) {
                console.log('getData====', result);
                setRecord([...result]);
            }
            return result;
        } catch (error) {
            console.error("Step Data Fetching Error", error);
        }
    }
    //Fetch the single water Record from the database
    const getWaterData = async (s: any) => {
        // console.log(s)
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            return await db.getAllAsync('SELECT * FROM water_record WHERE date = ?', s);
        } catch (error) {
            console.error("Water Data Fetch", error)
        }
    }


    //Update the water Record
    const updateWaterRecord = async (s: string | number | boolean | Uint8Array | null, drinkGoal: string | number | boolean | Uint8Array | null, cupCapacity: string | number | boolean | Uint8Array | null, waterdrinked: string | number | boolean | Uint8Array | null) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            // console.log("sdsd", waterdrinked, drinkGoal, cupCapacity)
            const result = await db.runAsync('UPDATE water_record SET waterIntake = ? , goal=? , cupCapacity=?   WHERE date = ?',
                [waterdrinked, drinkGoal, cupCapacity, s]);
            if (result) {
                // console.log('rrrrr', result)
            }
        } catch (error) {
            console.error("Water Update  Error", error)
        }
    }
    //Fetching all water records from the database
    const getALLWaterData = async () => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.getAllAsync('SELECT * FROM water_record');
            if (result) {
                // console.log("Water Data Fetching", result)
                setWaterHistory([...result]);
            }
        } catch (error) {
            console.error("Water Data Fetching Error", error)
        }
    }

    //insertion of single Water Record into the table
    const insertWaterData = async (dateOnly: string | number | boolean | Uint8Array | null, waterdrinked: string | number | boolean | Uint8Array | null, cupCapacity: string | number | boolean | Uint8Array | null, drinkGoal: string | number | boolean | Uint8Array | null) => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            await db.runAsync('INSERT INTO water_record ( date, waterIntake,cupCapacity,goal) VALUES (?, ?, ?, ?)',
                dateOnly, waterdrinked, cupCapacity, drinkGoal);
        } catch (error) {
            console.log('Error inserting water, error: ' + error)
        }
    };

    //function for clean the entire foot step counter table
    const dropTable = async () => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.runAsync('DELETE  FROM step_data WHERE date = $value', { $value: '02/08/2024' });
        if (result) {
            // console.log('Data deleted successfully', result);
            const allRows = await db.getAllAsync('SELECT * FROM step_data');
            // console.log('allRows===', allRows);
            setRecord([...allRows]);
        }

    };

    //Function for updating the footstep Data
    const updateFootStepRecord = async (s: string | number | boolean | Uint8Array | null, currentStepCount: string | number | boolean | Uint8Array | null, goal: string | number | boolean | Uint8Array | null, kcal: string | number | boolean | Uint8Array | null, distance: string | number | boolean | Uint8Array | null) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.runAsync('UPDATE step_data SET footsteps = ? ,goal =?, distance=? , energy=?   WHERE date = ?',
                [currentStepCount, goal, distance, kcal, s]);
            if (result) {
                // console.log('rrrrr', result)
            }
        } catch (error) {
            console.error("Water Update  Error", error)
        }
    }



    return {
        insertData,
        getData,
        dropTable,
        insertWaterData,
        getWaterData,
        getALLWaterData,
        updateWaterRecord,
        updateFootStepRecord,
    };
};