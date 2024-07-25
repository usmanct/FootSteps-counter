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
        try {
            await db.runAsync('INSERT INTO step_data (date, footsteps, flag, distance, energy) VALUES (?, ?, ?, ?, ?)',
                state.date, state.footsteps, state.flag, state.distance, state.energy);
        } catch (error) {
            console.error("Insertion Step Data Error", error);
        }

    };
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
    const getWaterData = async (s: any) => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.getAllAsync('SELECT * FROM water_record WHERE date = ?', s);
            if (result) {
                setWaterRecord([...result]);
            }
        } catch (error) {
            console.error("Water Data Fetching Error", error)
        }
    }
    const getALLWaterData = async () => {
        const db = await SQLite.openDatabaseAsync('usmanct');
        try {
            const result = await db.getAllAsync('SELECT * FROM water_record');
            if (result) {
                setWaterHistory([...result]);
            }
        } catch (error) {
            console.error("Water Data Fetching Error", error)
        }
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
        try {
            await db.runAsync('INSERT INTO water_record ( date, waterIntake,cupCapacity,goal) VALUES (?, ?, ?, ?)',
                waterState.date, waterState.waterIntake, waterState.cupCapacity, waterState.goal);
        } catch (error) {
            console.log('Error inserting water, error: ' + error)
        }
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