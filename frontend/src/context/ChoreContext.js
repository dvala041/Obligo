import {useReducer, createContext} from 'react' 

//Export the context
export const ChoreContext = createContext()

//Export the reducer function
export const choreReducer = (state, action) => {
    switch(action.type) {
        case "SET_CHORES": 
            return {...state, chores: action.payload} 
        case "CREATE_CHORE":
            return {...state, chores: [action.payload, ...state.chores]}
        case "REMOVE_CHORE": 
            return {...state, chores: state.chores.filter((c)=> c._id != action.payload)}
        case "UPDATE_CHORE":
            return {...state, chores: 
                state.chores.map((chore) => (
                    action.payload._id === chore._id ? action.payload : chore
                ))
            }
        
        default:
            return state 
    }
}

//Export the context provider

export const ChoresContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(choreReducer, {chores: null})
    return (
        <ChoreContext.Provider value={{...state, dispatch}}>
            {children}
        </ChoreContext.Provider>

    )
}