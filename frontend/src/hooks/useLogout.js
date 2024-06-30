import { useAuthContext } from "./useAuthContext";
import { useChoreContext } from "./useChoreContext";

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: choreDispatch} = useChoreContext()

    //set global user state to null and delete token in local storage
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT"})
        choreDispatch({type:"SET_CHORES", payload: null})//set global chore state to null if user logs out
    }

    return {logout}
}