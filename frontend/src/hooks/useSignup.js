import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {

    const {dispatch} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const signup = async(username, password) => {
        //default values before every request
        setError(false)
        setIsLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            }
        )

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            setIsLoading(false)
            dispatch({type: 'LOGIN', payload: json})
            localStorage.setItem('user', JSON.stringify(json)) //might change what i store in local storage
        }
    }
    return {signup, isLoading, error}
}