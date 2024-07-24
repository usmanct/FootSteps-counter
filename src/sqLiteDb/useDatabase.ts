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
    }: any = useContext(AppContext);

    const insertData = async () => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.runAsync('INSERT INTO step_data (date, footsteps, flag, distance, energy) VALUES (?, ?, ?, ?, ?)',
            state.date, state.footsteps, state.flag, state.distance, state.energy);
        if (result) {
            console.log('ddd', result);
            const allRows = await db.getAllAsync('SELECT * FROM step_data');

            console.log('allRows', allRows);
        }
    };
    const getData = async (s: any) => {
        setIsLoading(true)
        const db = await SQLite.openDatabaseAsync('usmanct');
        console.log("Insde getData function", s)
        const result = await db.getAllAsync('SELECT * FROM step_data WHERE date = ?', s);
        if (result) {
            console.log('Data', result);
            setRecord([...result]);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    const getWaterData = async (s: any) => {
        setIsLoading(true)
        const db = await SQLite.openDatabaseAsync('usmanct');
        console.log("Inside Water", s)
        const result = await db.getAllAsync('SELECT * FROM water_record WHERE date = ?', s);
        if (result) {
            console.log('Water', result);
            setWaterRecord([...result]);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    const getALLWaterData = async () => {
        setIsLoading(true)
        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.getAllAsync('SELECT * FROM water_record');
        if (result) {
            console.log('Water', result);
            setWaterHistory([...result]);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    const dropTable = async (s: any) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.runAsync('DELETE  FROM step_data WHERE flag = $value', { $value: 0 });
        if (result) {
            console.log('Data deleted successfully', result);
            const allRows = await db.getAllAsync('SELECT * FROM step_data');
            console.log('allRows', allRows);
            setRecord([...allRows]);
        }

    };


    const insertWaterData = async () => {

        const db = await SQLite.openDatabaseAsync('usmanct');
        const result = await db.runAsync('INSERT INTO water_record ( date, waterIntake,cupCapacity,goal) VALUES (?, ?, ?, ?)',
            waterState.date, waterState.waterIntake, waterState.cupCapacity, waterState.goal);
        if (result) {
            console.log('ddd', result);
            const allRows = await db.getAllAsync('SELECT * FROM water_record');

            console.log('allRows', allRows);
        }
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1000)
    };


    return {
        insertData,
        getData,
        dropTable,
        insertWaterData,
        getWaterData,
        getALLWaterData
    };
};