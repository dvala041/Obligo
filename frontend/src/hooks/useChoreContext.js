import {useContext} from 'react'
import { ChoreContext } from '@/context/ChoreContext'


export const useChoreContext = () => {
    const context = useContext(ChoreContext)

    if(!context) {
        throw Error("Component cannot access provider")
    }

    return context //{chores: [], dispatch}
}