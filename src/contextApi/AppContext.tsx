import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        date: '',
        footsteps: 0,
        flag: false,
        distance: 0,
        energy: 0
    });
    const [record, setRecord] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [drinkGoal, setDrinkGoal] = useState(1000)
    const [cupCapacity, setCupCapacity] = useState(50)
    const [waterdrinked, setwaterdrinked] = useState(0)
    const [IsgoalAchieved, setISgoalAchieved] = useState(false)
    const [preWaterCount, setWaterCupCount] = useState(0)
    const [noOfCups, setNoOfCups] = useState(0)
    const [modalType, setModalType] = useState('')
    const [waterRecord, setWaterRecord] = useState([])
    const [waterState, setWaterState] = useState({
        date: '',
        waterIntake: 0,
        cupCapacity: 0,
        goal: 0
    })
    const [IsCupfilllied, setIsCupfilllied] = useState(false)
    const [waterHistory, setWaterHistory] = useState([])


    const MAX_HEIGHT = 200
    return (
        <AppContext.Provider value={{
            state,
            setState,
            isLoading,
            setIsLoading,
            record,
            setRecord,
            drinkGoal,
            setDrinkGoal,
            MAX_HEIGHT,
            cupCapacity,
            setCupCapacity,
            waterdrinked,
            setwaterdrinked,
            IsgoalAchieved,
            setISgoalAchieved,
            preWaterCount,
            setWaterCupCount,
            noOfCups,
            setNoOfCups,
            modalType,
            setModalType,
            waterRecord,
            setWaterRecord,
            waterState,
            setWaterState,
            IsCupfilllied,
            setIsCupfilllied,
            waterHistory,
            setWaterHistory,
        }}>
            {children}
        </AppContext.Provider>
    );
};
