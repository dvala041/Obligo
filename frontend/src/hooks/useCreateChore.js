import {useState} from 'react'
import { useAuthContext } from "./useAuthContext"

export const useCreateChore = () => {

    const {user} = useAuthContext()
    const username = user.username
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box
    const created_by = user._id


    const createChore = async(title, description, due_date, points, assigned_user) => {
        //default values before every request
        setError(false)
        setIsLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({title, description, due_date, points, assigned_user, created_by})
            }
        )

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            setIsSuccess(false)
            setEmptyFields(json.emptyFields)
        } else {
            setIsLoading(false)
            setIsSuccess(true)
            setEmptyFields([])
        }
    }
    return {createChore, isLoading, username, error, isSuccess, setIsSuccess, emptyFields}
}