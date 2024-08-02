import {useContext} from 'react'
import { ChoreContext } from '@/context/ChoreContext'


export const useChoreContext = () => {
    const context = useContext(ChoreContext)

    if(!context) {
        throw Error("Component cannot access provider")
    }

    // console.log("CHORE CONTEXT: ", context) //the context looks like this: {chores: an array, dispatch}
    return context //{chores: [], dispatch}
}