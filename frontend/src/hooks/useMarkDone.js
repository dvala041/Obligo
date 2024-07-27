import { useState } from "react"
import { useChoreContext } from "./useChoreContext"
import { useAuthContext } from "./useAuthContext"


export const useMarkDone = () => {
    const {dispatch: choreDispatch} = useChoreContext()
    const {user} = useAuthContext()

    const [error, setError] = useState("")


    const markDone = async(assigned_user, created_by, choreId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/${choreId}/markDone`,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
            body: JSON.stringify({assigned_user, created_by})
        }
        )

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        } else {

            //remove the chore from our home page; will show it on completed page
            if (json.status === "Completed") {
                choreDispatch({type: "REMOVE_CHORE", payload: json._id}) 
            } else if(json.status === "Pending") {
                choreDispatch({type: "UPDATE_CHORE", payload: json})
            }
            
        }
    }
    return {markDone, error, setError}
}