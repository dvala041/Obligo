import { useFamilyContext } from "@/hooks/useFamilyContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal, Box, Button, Container, Typography, TextField } from "@mui/material";
import { useCreateFamily } from "@/hooks/useCreateFamily";
import Alert from '@mui/material/Alert';
import NoFamily from "@/components/noFamily";
import FamilyDashboard from "@/components/familyDashboard";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'center', // Center the content vertically
};

const Family = () => {
    const {family, dispatch: familyDispatch} = useFamilyContext()

    const { user, loading, dispatch: userDispatch } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !user) {
            router.push("/login")
            return 
        }
    }, [user, router, loading])

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


    return(
        <>
        {!family ? ( 
          !user ? (
            <>
              ...loading
            </>
          ) : (
            <NoFamily data={style}/>
          )
            
        ) : (
            <>
            <FamilyDashboard data={style}/>
            </>
        )}

        </>
    )
}

export default Family