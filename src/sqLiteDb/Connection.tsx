import * as SQLite from 'expo-sqlite';


export const datadb = async (s :any) => {
    const db = await SQLite.openDatabaseAsync('Usmanctdb');
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        `);

    // `runAsync()` is useful when you want to execute some write operations.
    const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', s.date, s.steps);
    console.log('dsd', result.lastInsertRowId, result.changes);
    const firstRow : any = await db.getFirstAsync('SELECT * FROM test');
    const allRows : any = await db.getAllAsync('SELECT * FROM test');
    console.log('1st Row: ',firstRow.id, firstRow.value, firstRow.intValue);
    console.log('allRows: ',allRows);
    // console.log('Statte', s)
}