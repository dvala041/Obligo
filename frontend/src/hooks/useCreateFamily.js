import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from './useFamilyContext'

export const useCreateFamily = () => {

    const {user, dispatch: userDispatch} = useAuthContext()
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box


    const createFamily = async(name, userId) => {
        //default values before every request
        setError(false)
        setIsLoading(true)
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({userId, name})
            }
        )

        const json = await response.json() //returns {family: {}, user: {}}

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            setIsSuccess(false)
            setEmptyFields(json.emptyFields)
        } else {
            userDispatch({type: "UPDATE_USER", payload: json.user}) //updating the global user's state
            familyDispatch({type: "SET_FAMILY", payload: json.family})
            const user = JSON.parse(localStorage.getItem('user'))
            const updatedUser = {...user, ...json.user}
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setIsLoading(false)
            setIsSuccess(true)
            setEmptyFields([])
        }

    }
    return {createFamily, isLoading, error, setError, isSuccess, setIsSuccess, emptyFields, setEmptyFields}
}