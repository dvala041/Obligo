import { useAuthContext } from "./useAuthContext";
import { useChoreContext } from "./useChoreContext";
import { useFamilyContext } from "./useFamilyContext";

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: choreDispatch} = useChoreContext()
    const {dispatch: familyDispatch} = useFamilyContext()

    //set global user state to null and delete token in local storage
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT"})
        choreDispatch({type:"SET_CHORES", payload: null})//set global chore state to null if user logs out
        familyDispatch({type: "SET_FAMILY", payload: null})
    }

    return {logout}
}