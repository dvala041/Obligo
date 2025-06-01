'use client'
import {useState, useEffect} from 'react'
import {useLogin} from '@/hooks/useLogin'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'
import { ClipboardList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
//Components
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Link from 'next/link'
// import { Grid } from '@mui/material'


const theme = createTheme({
    palette: {
      primary: {
        main: "#9e8772",
        contrastText: '#fff',
      },
    },
  });

export default function Login () {
    const {user, loading} = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(user && !loading) {
            router.push({pathname: "/dashboard", query: {showMessage: true, message: "Logged in"}})
            return 
        }

    }, [user, loading, router])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex justify-center">
                <Link href="/" className="flex items-center space-x-2">
                  <ClipboardList className="h-10 w-10 text-[#81a651]" />
                  <span className="text-2xl font-bold text-[#81a651]">Obligo</span>
                </Link>
              </div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#81a651]">
                Sign in to your account
              </h2>
              {error && <Alert severity="error">{error}</Alert>}
            </div>

    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-[#9e8772] font-semibold">
                    Username
                  </label>
                  <div className="mt-2">
                    <Input
                      id="username"
                      name="username"
                      // type="email"
                      autoComplete="email"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-[#9e8772]/30 focus:border-[#81a651] focus:ring-[#81a651]"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#9e8772] font-semibold">
                      Password
                    </label>
                    <div className="text-sm">
                      <Link href="#" className="font-semibold text-[#81a651] hover:text-[#6a8a43]">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[#9e8772]/30 focus:border-[#81a651] focus:ring-[#81a651]"
                    />
                  </div>
                </div>
    
                <div>
                  <Button type="submit" className="w-full bg-[#81a651] hover:bg-[#6a8a43] text-white">
                    Sign in
                  </Button>
                </div>
              </form>
    
              {/* <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-[#9e8772]">Or continue with</span>
                  </div>
                </div>
    
                <div className="mt-6">
                  <Button variant="outline" className="w-full border-gray-300" asChild>
                    <a href="#" className="flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Sign in with Google
                    </a>
                  </Button>
                </div>
              </div> */}
    
              <p className="mt-10 text-center text-sm text-[#9e8772]">
                Not a member?{" "}
                <Link href="/signup" className="font-semibold leading-6 text-[#81a651] hover:text-[#6a8a43]">
                  Create a free account
                </Link>
              </p>
            </div>
          </div>
        </div>
      )

    }
//     return (
//         <>
//         <ThemeProvider theme={theme}>
//             <Container component="main" maxWidth="xs">
//                 <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: '#81a651' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5" sx={{color: '#9e8772'}}>
//                         Sign in
//                     </Typography>
//                     {error && <Alert severity="error">{error}</Alert>}
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="Username"
//                             name="username"
//                             autoComplete="username"
//                             autoFocus
//                             onChange={(e)=>setUsername(e.target.value)}
//                             inputProps={{maxLength: '10'}}
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                             onChange={(e)=>setPassword(e.target.value)}
//                         />
//                         <Button
//                             disabled={isLoading}
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2, backgroundColor: "#81a651", '&:hover': {'backgroundColor': '#81a651'}}}
//                         >
//                         Sign In
//                         </Button>

//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <Link href="/password" variant="body2">
//                                 <Typography sx={{
//                                     'color': 'gray', 'textAlign': 'center', '&:hover': {'color': 'lightblue', 'textDecoration': 'underline'}
//                                     }}> Forgot Password? </Typography>
//                                 </Link>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Link href="/signup" variant="body2">
//                                 <Typography sx={{
//                                     'color': 'gray', 'textAlign': 'center', '&:hover': {'color': 'lightblue', 'textDecoration': 'underline'}
//                                     }}> Don't have an account? Sign up! </Typography>
//                                 </Link>
//                             </Grid>
//                         </Grid>

//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//         </>
//     )
// }