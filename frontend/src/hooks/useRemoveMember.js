import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useRemoveMember = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {family, dispatch: familyDispatch} = useFamilyContext()

    //update family via family dispatch
    const removeMember = async(memberId) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${family._id}/removeMember`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({userId: memberId})
            }
        )

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        } else {
            familyDispatch({type: "REMOVE_MEMBER", payload: memberId})
        }
        setIsLoading(false)
    }

    return {removeMember, error, setError, isLoading, setIsLoading}

}