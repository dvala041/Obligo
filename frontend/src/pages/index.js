import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card, Grid, Box, Typography } from "@mui/material";
import EventCard from "@/components/eventCard";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useChoreContext } from '@/hooks/useChoreContext'
import { useAuthContext } from "@/hooks/useAuthContext";
import { useFamilyContext } from "@/hooks/useFamilyContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { chores, dispatch } = useChoreContext()
  const { user, loading, dispatch: userDispatch } = useAuthContext()
  const {family, dispatch: familyDispatch} = useFamilyContext()
  const [showMessage, setShowMessage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (router.query.showMessage) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
        router.replace('/', undefined, { shallow: true })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [loading, user, router.query.showMessage, router])

  useEffect(() => {
    const fetchChores = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/?assigned_user=${user._id}&status=ne:Completed`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        })
        const json = await response.json()
      
        if (response.ok) {
          dispatch({ type: 'SET_CHORES', payload: json })
        } else {
          userDispatch({ type: 'LOGOUT' })
          console.log("Logged out")
        }
    }

    if(user) {
      fetchChores()
    }
  }, [user, dispatch, userDispatch])

  //fetch family data if page was closed and user comes back
  useEffect(()=> {
    const fetchFamily = async() => {
      try{
        const familyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${user.familyId}`,
          {headers: {"Authorization": `Bearer ${user.token}`}}
        )
  
        const familyJson = await familyResponse.json()
  
        if(!familyResponse.ok) {
            setError(familyJson.error)
        } else {
            familyDispatch({type: 'SET_FAMILY', payload: familyJson})
        }
      } catch (error) {
        throw error
      } 
    }

    //fetch the family if the user has a family ID that's not null and family state is null
    if(user.familyId && !family) {
      fetchFamily()
    }

  }, [])

  return (
    <>
    {showMessage &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {router.query.message}
        </Alert>
      }
      {/* {chores && !chores.chores ? (
        <> 
          <Box sx  = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: { xs: 'center' },
              mt: {xs: 30, md: 20}
          }}>

            <Typography sx={{color: '#9e8772', textAlign: 'center'}}>
                Looks like you don't have any chores due. Hooray!
            </Typography>
          </Box>
        </>
      ) : ( */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
        {chores && chores.map(chore => (
          <Grid item key={chore._id} xs={12} md={6} lg={4}>
            <EventCard chore={chore} userId={user._id}/>
          </Grid>
        ))}
      </Grid>
      {/* )} */}
      
    </>
  );
}
