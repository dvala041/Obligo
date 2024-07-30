import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useChoreContext } from "./useChoreContext"
export const useDeleteChore = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch: choreDispatch} = useChoreContext()

    //update family via family dispatch
    const deleteChore = async(choreId) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/${choreId}`,
            {
                method: "DELETE",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
            }
        )

        const json = await response.json() //the json is the choreId

        if(!response.ok) {
            setError(json.error)
        } else {
            choreDispatch({type: "REMOVE_CHORE", payload: json})
        }
        setIsLoading(false)
    }

    return {deleteChore, error, setError, isLoading, setIsLoading}

}