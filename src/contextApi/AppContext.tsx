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
    const [isLoading, setIsLoading] = useState(false);
    return (
        <AppContext.Provider value={{ state, setState, isLoading, setIsLoading ,record, setRecord }}>
            {children}
        </AppContext.Provider>
    );
};
