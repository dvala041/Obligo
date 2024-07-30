import { useState } from "react"
import { useChoreContext } from "./useChoreContext"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"


export const useMarkDone = () => {
    const {dispatch: choreDispatch} = useChoreContext()
    const {dispatch: userDispatch} = useAuthContext()
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const {user} = useAuthContext()

    const [error, setError] = useState("")


    const markDone = async(assigned_user, created_by, choreId, status, points) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/${choreId}/markDone`,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
            body: JSON.stringify({assigned_user, created_by, status, points})
        }
        )

        const json = await response.json()
        console.log("JSON CHORE", json.chore)

        if(!response.ok) {
            setError(json.error)
        } else {

            //remove the chore from our home page; will show it on completed page
            if (json.status === "Completed") {
                choreDispatch({type: "REMOVE_CHORE", payload: json.chore._id}) 
            } else if(json.status !== "Completed") {
                choreDispatch({type: "UPDATE_CHORE", payload: json.chore})
            }

            //update user's points and choresComplete fields if they completed a chore
            if(json.user) {
                userDispatch({type: "UPDATE_USER", payload: json.user})
                if(family) { familyDispatch({type: "UPDATE_MEMBER", payload: json.user}) }
                const user = JSON.parse(localStorage.getItem('user'))
                const updatedUser = {...user, ...json.user}
                localStorage.setItem('user', JSON.stringify(updatedUser))
            }
            
        }
    }
    return {markDone, error, setError}
}