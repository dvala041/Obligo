import {useReducer, createContext} from 'react' 

//Export the context
export const ChoreContext = createContext()

//Export the reducer function
export const choreReducer = (state, action) => {
    switch(action.type) {
        case "SET_CHORES": 
            return {chores: action.payload} 
        case "CREATE_CHORE":
            return {chores: [action.payload, ...state]}
        case "DELETE_CHORE": 
            return {chores: state.chores.filter((c)=> c._id != action.payload._id)}
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