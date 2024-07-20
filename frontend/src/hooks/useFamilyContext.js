import {useContext} from 'react'
import { FamilyContext } from '@/context/FamilyContext'


export const useFamilyContext = () => {
    const context = useContext(FamilyContext)

    if(!context) {
        throw Error("Component cannot access provider")
    }
    console.log("Familycontext: ", context)
    return context //{family: [], dispatch}
}