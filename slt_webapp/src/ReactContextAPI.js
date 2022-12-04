import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ReactContextAPI = createContext();

export const ReactContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] =  useState(JSON.parse(localStorage.getItem("user")) || null);
    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8000/api/SignIn", inputs, { withCredentials: true });
        setCurrentUser(res.data);
    }

    const logout = async(inputs) => {
        await axios.post("http://localhost:8000/api/logout");
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <ReactContextAPI.Provider value={{currentUser, login, logout}}>
            {children}
        </ReactContextAPI.Provider>
    );
}