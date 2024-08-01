import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useUpdateFamilyName = () => {
    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch: familyDispatch} = useFamilyContext()
    const [isSuccess, setIsSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]) //for red box


    //update family via family dispatch
    const updateFamilyName = async(familyId, name) => {
        setError(false)
        setIsLoading(false)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${familyId}`,
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({name})
            }
        )

        const json = await response.json()
        console.log("JSON RESPONSE: ", json)

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsSuccess(false)
        } else {
            familyDispatch({type: "UPDATE_FAMILY", payload: json.name})


            setEmptyFields([])
            setIsSuccess(true)
        }
        setIsLoading(false)
    }

    return {updateFamilyName, error, setError, isLoading, setIsLoading, emptyFields, setEmptyFields, isSuccess, setIsSuccess}

}
