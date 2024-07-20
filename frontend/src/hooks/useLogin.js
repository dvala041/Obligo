import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from './useFamilyContext'

export const useLogin = () => {

    const {dispatch: userDispatch} = useAuthContext()
    const {dispatch: familyDispatch} = useFamilyContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const login = async(username, password) => {
        //default values before every request
        setError(false)
        setIsLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
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
            userDispatch({type: 'LOGIN', payload: json})
            localStorage.setItem('user', JSON.stringify(json)) //might change what i store in local storage

            //if familyId is null just set the global family state to an empty array
            if(json.familyId) {
                const familyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${json.familyId}`,
                    {headers: {"Authorization": `Bearer ${json.token}`}}
                )

                const familyJson = await familyResponse.json()

                if(!familyResponse.ok) {
                    setError(familyJson.error)
                } else {
                    familyDispatch({type: 'SET_FAMILY', payload: familyJson})
                }
            }



            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
}