import * as SQLite from 'expo-sqlite';
import { useContext } from 'react';
import { AppContext } from '../contextApi/AppContext';

export const useDatabase = () => {
    const {
        state,
        setState,
        setIsLoading,
        setRecord,
        waterRecord,
        setWaterRecord,
        setWaterState,
        waterState,
        waterHistory,
        setWaterHistory,
        setwaterdrinked,
        MAX_HEIGHT,
        drinkGoal,
        setDrinkGoal
    }: any = useContext(AppContext);
    //Inserting the footsteps data into the data
    const insertData = async () => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            await db.runAsync('INSERT INTO step_data (date, footsteps, flag, distance, energy) VALUES (?, ?, ?, ?, ?)',
                state.date, state.footsteps, state.flag, state.distance, state.energy);
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
                setRecord([...result]);
            }
        } catch (error) {
            console.error("Step Data Fetching Error", error);
        }
    }
    //Fetch the single water Record from the database
    const getWaterData = async (s: any) => {
        console.log(s)
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.getAllAsync('SELECT * FROM water_record WHERE date = ?', s);
            if (result) {
                setWaterState(result[0]);
            }
        } catch (error) {
            console.error("Water Data Fetching Error", error)
        }
    }


    //Update the water Record
    const updateWaterRecord = async (s: any) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.runAsync('UPDATE water_record SET waterIntake = ? , goal=? , cupCapacity=?   WHERE date = ?',
                [waterState.waterIntake, waterState.goal, waterState.cupCapacity, s]);
            if (result) {
                console.log('rrrrr', result)
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
    const insertWaterData = async () => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            await db.runAsync('INSERT INTO water_record ( date, waterIntake,cupCapacity,goal) VALUES (?, ?, ?, ?)',
                waterState.date, waterState.waterIntake, waterState.cupCapacity, waterState.goal);
        } catch (error) {
            console.log('Error inserting water, error: ' + error)
        }
    };

    //function for clean the entire foot step counter table
    const dropTable = async () => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.runAsync('DELETE  FROM water_record WHERE date = $value', { $value: '29/07/2024' });
        if (result) {
            console.log('Data deleted successfully', result);
            const allRows = await db.getAllAsync('SELECT * FROM water_record');
            console.log('allRows', allRows);
            setWaterHistory([...allRows]);
        }

    };



    return {
        insertData,
        getData,
        dropTable,
        insertWaterData,
        getWaterData,
        getALLWaterData,
        updateWaterRecord
    };
};