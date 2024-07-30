import { useState } from "react"
import { useChoreContext } from "./useChoreContext"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useEditChore = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch: choreDispatch} = useChoreContext()
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box


    //update family via family dispatch
    const editChore = async(title, description, due_date, points, assigned_user, choreId, status) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/${choreId}`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({title, description, due_date, points, assigned_user, status})
            }
        )

        const json = await response.json()
        console.log("JSON RESPONSE: ", json)

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsSuccess(false)
        } else {
            choreDispatch({type: "UPDATE_CHORE", payload: json})


            setEmptyFields([])
            setIsSuccess(true)
        }
        setIsLoading(false)
    }

    return {editChore, error, setError, isLoading, setIsLoading, emptyFields, setEmptyFields, isSuccess, setIsSuccess}

}
