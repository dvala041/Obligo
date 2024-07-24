import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useFamilyContext } from "./useFamilyContext"

export const useUpdateMember = () => {
    const {user, dispatch: userDispatch} = useAuthContext()
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
                body: JSON.stringify({userId: memberId, role, points, choresComplete, editorId: user._id})
            }
        )

        const json = await response.json()
        console.log("JSON RESPONSE: ", json)

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsSuccess(false)
        } else {
            familyDispatch({type: "UPDATE_MEMBER", payload: json.user})

            //if the editor was an owner and made someone else an owner
            if(json.editor) {
                userDispatch({type: "UPDATE_USER", payload: json.editor}) //update our current user to be an admin

                //also update current user in the global family members array
                familyDispatch({type: "UPDATE_MEMBER", payload: json.editor})

                //Reflect changes in local storage
                const user = JSON.parse(localStorage.getItem('user'))
                const updatedUser = {...user, ...json.editor}
                localStorage.setItem('user', JSON.stringify(updatedUser))
            }

            //if we edit ourselves (memberId is the card's Id)
            if(memberId === user._id) {
                userDispatch({type: "UPDATE_USER", payload: json.user}) //update our current user to be an admin

                //also update current user in the global family members array
                familyDispatch({type: "UPDATE_MEMBER", payload: json.user})

                //Reflect changes in local storage
                const user = JSON.parse(localStorage.getItem('user'))
                const updatedUser = {...user, ...json.user}
                localStorage.setItem('user', JSON.stringify(updatedUser))

            }

            setEmptyFields([])
            setIsSuccess(true)
        }
        setIsLoading(false)
    }

    return {updateMember, error, setError, isLoading, setIsLoading, emptyFields, setEmptyFields, isSuccess, setIsSuccess}

}
