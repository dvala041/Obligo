import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useLeaveFamily = () => {
    const {user, dispatch: userDispatch} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const [isSuccess, setIsSuccess] = useState(null)


    //update family via family dispatch
    const leaveFamily = async(userId) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${family._id}/leaveFamily`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({userId})
            }
        )

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setIsSuccess(false)
        } else {
            familyDispatch({type: "DELETE_FAMILY"}) //this sets global family state to null (ik im using delete but same thing)
            userDispatch({type: "UPDATE_USER", payload: json})
            const user = JSON.parse(localStorage.getItem('user'))
            const updatedUser = {...user, ...json}
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setIsSuccess(true)
        }
        setIsLoading(false)
    }

    return {leaveFamily, error, setError, isLoading, setIsLoading, isSuccess, setIsSuccess}

}
