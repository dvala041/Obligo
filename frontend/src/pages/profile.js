import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { Avatar, Container, Box, Typography, Paper } from "@mui/material"
import { useFamilyContext } from "@/hooks/useFamilyContext"


const Profile = () => {
    const {loading, user} = useAuthContext()
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
          router.push("/login")
          return
        }}, [loading, user, router])


      // I have to fetch the family cuz if i refresh the page global family state becomes null
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
        if(user.familyId && !family) {
          fetchFamily()
        }
    
      }, [])

    return (
      <>
      {/* Had to add this cuz if i logged out while on profile page i would get an error that user.username was null */}
      {!user ? (
        <>
          ...loading
        </>
      ) : (
        <>
        <Container maxWidth="xl" disableGutters>

        {/* This paper is a box for the user's profile pic/avatar */}
        <Paper elevation={24} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', //this is what actually centers the avatar
          width: {xs: '75%', md: '50%'},
          marginTop: 8,
          mx: 'auto', //mx is short for margin left and right
          backgroundColor: 'white'
        }}>
          <Avatar 
            alt={user.username}
            src="/mom"
            sx={{ 
              width: { xs: '6em', md: '8em' }, //'em' works very well
              height: { xs: '6em', md: '8em' },
              bgcolor: '#9e8772', // Optional: background color for the avatar
              color: 'white', // Color of the text
              marginTop: 4
            }}
          >
            <Typography sx={{
              fontSize:{xs:'2em', md: '3em'}
            }}>
              {user.username.charAt(0).toUpperCase()} {/* Display the first letter */}
            </Typography>
          </Avatar>

          <br/>
          <br/>

          <Typography sx={{color: 'var(--text-color)'}}>
          <strong> Username: </strong> {user.username}
          </Typography>

          <Typography sx={{color: 'var(--text-color)'}}>
            <strong> Points: </strong> {user.points}
          </Typography>

          <Typography sx={{color: 'var(--text-color)'}}>
          <strong> Chores Complete: </strong> {user.choresComplete}
          </Typography>

          <Typography sx={{color: 'var(--text-color)'}}>
          <strong> Role: </strong> {user.role}
          </Typography>

          <Typography sx={{color: 'var(--text-color)'}}>
          <strong> Family: </strong> {family ? (family.name): ("None")}
          </Typography>

          <br/>
          <br/>
          <br/>

          
        </Paper>
      </Container>
        </>
      )}
      </>
    )
}

export default Profile