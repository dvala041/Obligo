import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card, Grid } from "@mui/material";
import EventCard from "@/components/eventCard";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useChoreContext } from '@/hooks/useChoreContext'
import { useAuthContext } from "@/hooks/useAuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { chores, dispatch } = useChoreContext()
  const { user, loading, dispatch: userDispatch } = useAuthContext()
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chore/?assigned_user=${user._id}`, {
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

  return (
    <>
    {showMessage &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {router.query.message}
        </Alert>
      }
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {chores && chores.map(chore => (
          <Grid item key={chore._id} xs={12} md={6} lg={4}>
            <EventCard chore={chore} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
