'use client'
import {useState, useEffect} from 'react'
import { useSignup } from '@/hooks/useSignup'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'

//Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import { Grid } from '@mui/material'

//const defaultTheme = createTheme();

const theme = createTheme({
    palette: {
      primary: {
        main: "#9e8772",
        contrastText: '#fff',
      },
    },
  });

export default function Signup () {
    const {user, loading} = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(user && !loading) {
            router.push({pathname: "/", query: {showMessage: true, message: "Signed Up"}})
            return 
        }

    }, [user, loading, router])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup(username, password)
    }

    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#81a651' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{color: '#9e8772'}}>
                        Sign Up
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ color: '#9e8772', mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#81a651", '&:hover': {'backgroundColor': '#81a651'}}}
                        >
                        Sign Up
                        </Button>

                        <Grid container >
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                <Typography sx={{
                                    'color': 'gray', 'textAlign': 'center', '&:hover': {'color': 'lightblue', 'textDecoration': 'underline'}
                                    }}> Already have an account? Sign in! </Typography>
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}