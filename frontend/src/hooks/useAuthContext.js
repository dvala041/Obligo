import {useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext must be used inside an AuthContext provider")
    }
    // console.log("context: ", context)
    return context //returns {user, dispatch} where user = whatever we return in POST/api/login
}