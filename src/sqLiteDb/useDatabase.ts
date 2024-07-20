import * as SQLite from 'expo-sqlite';
import { useContext } from 'react';
import { AppContext } from '../contextApi/AppContext';

export const useDatabase = () => {
    const { state, setState, setIsLoading, setRecord }: any = useContext(AppContext);

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
    const getData = async () => {
        setIsLoading(true)
        const db = await SQLite.openDatabaseAsync('usmanct');
        console.log("Insde getData function")
        const result = await db.getAllAsync('SELECT * FROM step_data WHERE footsteps = ?', 49);
        if (result) {
            console.log('Data', result);
            setRecord([...result]);
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }
    return {
        insertData,
        getData
    };
};