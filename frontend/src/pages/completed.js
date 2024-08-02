import { useChoreContext } from "@/hooks/useChoreContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useFamilyContext } from "@/hooks/useFamilyContext";
import { useEffect } from "react"
import { useRouter } from "next/router";

import { Card, Grid, Typography, Box } from "@mui/material";
import EventCard from "@/components/eventCard";

const Completed = () => {
    
    const {chores, dispatch: choreDispatch} = useChoreContext()
    const {user, loading, dispatch: userDispatch} = useAuthContext()
    const {family, dispatch: familyDispatch, loading: familyLoading} = useFamilyContext()
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
                console.log("COMPLETED CHORES", json)
                choreDispatch({type: 'SET_CHORES', payload: json})
            }
        }
      

        if(user) { //this check may be redundant but oh well
            fetchCompletedChores()
        }
    }, [user, router, loading, choreDispatch])


    //fetch family data if page was closed and user comes back
    useEffect(()=> {
        const fetchFamily = async() => {
          try{
            const familyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${user.familyId}`,
              {headers: {"Authorization": `Bearer ${user.token}`}}
            )
      
            const familyJson = await familyResponse.json()
      
            if(familyResponse.ok) { 
                familyDispatch({type: 'SET_FAMILY', payload: familyJson})
            }
          } catch (error) {
            throw error
          } 
        }
    
        //fetch the family if the user has a family ID that's not null and family state is null
        if(user && user.familyId && !family) {
          fetchFamily()
        }
    
      }, [])

    return (
        <>

        {chores && chores.length === 0 ? (
        <> 
          <Box sx  = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: { xs: 'center' },
              mt: {xs: 30, md: 20}
          }}>

            <Typography sx={{color: '#9e8772', textAlign: 'center'}}>
                Looks like you haven't completed any chores recently!
            </Typography>
          </Box>
        </>
      ) : (
        <Grid container spacing={3} sx={{ padding: 2 }}>
        {chores && chores.map(chore => (
          <Grid item key={chore._id} xs={12} md={6} lg={4}>
            <EventCard chore={chore} userId={user._id}/>
          </Grid>
        ))}
      </Grid>
      )} 
        </>
    )
}

export default Completed