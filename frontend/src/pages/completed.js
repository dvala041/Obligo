import { useChoreContext } from "@/hooks/useChoreContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect } from "react"
import { useRouter } from "next/router";

import { Card, Grid } from "@mui/material";
import EventCard from "@/components/eventCard";

const Completed = () => {
    
    const {chores, dispatch: choreDispatch} = useChoreContext()
    const {user, loading, dispatch: userDispatch} = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !user) {
            router.push("/login")
            return 
        }

        const fetchCompletedChores = async() => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/?assigned_user=${user._id}&status=Completed`, {
                headers: {"Authorization": `Bearer ${user.token}`}
            })

            if(!response.ok) { //only way this route throws a not ok is if token is not authenticated
                userDispatch({type: "LOGOUT"})
                console.log("Need auth token; Also logged out")
            } else {
                const json = await response.json()
                choreDispatch({type: 'SET_CHORES', payload: json})
            }
        }

        if(user) { //this check may be redundant but oh well
            fetchCompletedChores()
        }
    }, [user, router, loading])




    return (
        <Grid container spacing={3} sx={{padding:2}}>
            {chores && chores.map(chore => (
                <Grid item key={chore._id} xs={12} md={6} lg={4}>
                <EventCard chore={chore}/>
                </Grid>
            ))}
        </Grid>

    )
}

export default Completed