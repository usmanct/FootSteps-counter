import * as SQLite from 'expo-sqlite';


const DataBaseInitialization = async () => {
    const db = await SQLite.openDatabaseAsync('usmanct');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS step_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                footsteps INTEGER NOT NULL,
                flag BOOLEAN NOT NULL,
                distance REAL NOT NULL,
                energy REAL NOT NULL
            );       
            CREATE TABLE IF NOT EXISTS water_record (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            waterIntake INTEGER NOT NULL,
            cupCapacity INTEGER NOT NULL,
            goal INTEGER NOT NULL
        );
            `)
    if (db) {

        console.log('Database initialized successfully', db);
    }
};

export default DataBaseInitialization;
