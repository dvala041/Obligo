import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from './useFamilyContext'

export const useAddMember = () => {

    const {user, dispatch: userDispatch} = useAuthContext()
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box


    const addMember = async(username, role) => {
        //default values before every request
        setError(false)
        setIsLoading(true)
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/6698818437d01ca1852e7237/addMember`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({username, role})
            }
        )

        const json = await response.json() //returns user object

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            setIsSuccess(false)
            setEmptyFields(json.emptyFields)
        } else {
            familyDispatch({type: "ADD_MEMBER", payload: json})
            setIsLoading(false)
            setIsSuccess(true)
            setEmptyFields([])
        }

    }
    return {addMember, isLoading, error, setError, isSuccess, setIsSuccess, emptyFields, setEmptyFields}
}