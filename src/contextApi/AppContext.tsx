import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        // Your initial state here
        date: '12/09/24',
        steps: 20
    });

    const [dbData , setDbData] = useState([])

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};
