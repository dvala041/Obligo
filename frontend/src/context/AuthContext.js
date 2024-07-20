'use client'

import {useReducer, createContext, useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            return {user: action.payload, loading: false}
        case "LOGOUT":
            return  {user: null, loading: false}
        case "LOADING":
            return {...state, loading: true}
        case "UPDATE_USER":
            return {
                ...state, //spreads the global state props like dispatch, user, and loading
                user: { //overrides the user property in state with an object that spreads user's props and replaces the familyId prop in user
                    ...state.user,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(authReducer, {user: null, loading: true})

    useEffect(() => {
        dispatch({type: 'LOADING'})
        const user = JSON.parse(localStorage.getItem("user"))
        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        } else {
            dispatch({type: 'LOGOUT'})
        }
    },[])

    console.log("AuthContext state: ", state )

    if (state.loading) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{...state, dispatch}}> 
            {children}
        </AuthContext.Provider>
    )
}
