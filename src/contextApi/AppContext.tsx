import React, { createContext, useState } from 'react';
// @ts-ignore
export const AppContext = createContext();

export const AppProvider = ({ children }: any) => {
    const [record, setRecord] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [preWaterCount, setWaterCupCount] = useState(0)
    const [noOfCups, setNoOfCups] = useState(0)
    const [modalType, setModalType] = useState('')
    const [waterRecord, setWaterRecord] = useState([])
    const [IsCupfilllied, setIsCupfilllied] = useState(false)
    const [waterHistory, setWaterHistory] = useState([])
    const [fetchData, setFetchData] = useState([])
    const [fillcontainer, setFillContainer] = useState<any>(0)
    const [currentStepCount, setCurrentStepCount] = useState(0);
    const [kcal, setKcal] = useState<any>(0);
    const [distance, setDistance] = useState<any>(0);
    const [target, setTarget] = useState(500)
    const [currentType, setCurrentType] = useState<string>('light')
    const [isPedometerRunning, setIsPedometerRunning] = useState<boolean>(false)
    const [reminderFlag, setReminderFlag] = useState(false)
    const [userData, setUserData] = useState({
        gender: 'male',
        age: '23',
        height: '172',
        weight: '72',

    })
    const [waterReminderFlag, setWaterReminderFlag] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<any>({
        h: 0,
        m: 0,
        md:'AM'
    })
    const [endTime, setEndTime] = useState<any>({
        h: 0,
        m: 0,
        md:'AM'
    })
    const [waterInterval, setWaterInterval] = useState<any>({
        h: 0,
        m: 0
    })

    const MAX_HEIGHT = 200
    return (
        <AppContext.Provider value={{
            isLoading,
            setIsLoading,
            record,
            setRecord,
            MAX_HEIGHT,
            preWaterCount,
            setWaterCupCount,
            noOfCups,
            setNoOfCups,
            modalType,
            setModalType,
            waterRecord,
            setWaterRecord,
            IsCupfilllied,
            setIsCupfilllied,
            waterHistory,
            setWaterHistory,
            fetchData,
            setFetchData,
            fillcontainer,
            setFillContainer,
            currentStepCount,
            setCurrentStepCount,
            kcal,
            setKcal,
            distance,
            setDistance,
            target,
            setTarget,
            currentType,
            setCurrentType,
            isPedometerRunning,
            setIsPedometerRunning,
            reminderFlag,
            setReminderFlag,
            userData,
            setUserData,
            waterReminderFlag,
            setWaterReminderFlag,
            startTime,
            setStartTime,
            endTime,
            setEndTime,
            waterInterval,
            setWaterInterval
        }}>
            {children}
        </AppContext.Provider>
    );
};
