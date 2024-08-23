import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { useDatabase } from '../sqLiteDb/useDatabase';
import { AppContext } from '../contextApi/AppContext';

const DataBaseUtility = () => {

    const [stepBgCounting, setStepBgCounting] = useState(0)
    const [stepBgKcal, setStepBgKcal] = useState(0)

    const { getData } = useDatabase(); // useDatabase hook might be refactored
    const getCurrentDayDataFromDB = async (dateOnly: string) => {
        console.log("Before", currentStepCount)
        try {
            const res: any = await getData(dateOnly);
            if (res && res.length > 0) {
                console.log('\\\\\\', res)
                setCurrentStepCount(res[0].footsteps);
                setKcal(res[0].energy);
                setDistance(res[0].distance);
                setTarget(res[0].goal);
            }
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
        console.log("getCurrentDayDataFromDB")
    };

    return {
        getCurrentDayDataFromDB
    }

}

export default DataBaseUtility

