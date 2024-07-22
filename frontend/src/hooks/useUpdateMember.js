import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useUpdateMember = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box


    //update family via family dispatch
    const updateMember = async(memberId, role, points, choresComplete) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${family._id}/updateMember`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({userId: memberId, role, points, choresComplete})
            }
        )

        const json = await response.json()
        console.log("JSON RESPONSE: ", json)

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsSuccess(false)
        } else {
            familyDispatch({type: "UPDATE_MEMBER", payload: json})
            setEmptyFields([])
            setIsSuccess(true)
        }
        setIsLoading(false)
    }

    return {updateMember, error, setError, isLoading, setIsLoading, emptyFields, setEmptyFields, isSuccess, setIsSuccess}

}
