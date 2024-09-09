import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }: any) => {

    const now = new Date();
    const dateOnly = now.toLocaleDateString();
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
    const [target, setTarget] = useState(100)
    const [currentType, setCurrentType] = useState<string>('light')
    const [isPedometerRunning , setIsPedometerRunning] = useState(false)


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
            setIsPedometerRunning
        }}>
            {children}
        </AppContext.Provider>
    );
};
