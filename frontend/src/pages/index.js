import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card, Grid, Box, Typography, Container, Button } from "@mui/material";
import EventCard from "@/components/eventCard";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useChoreContext } from '@/hooks/useChoreContext'
import { useAuthContext } from "@/hooks/useAuthContext";
import { useFamilyContext } from "@/hooks/useFamilyContext";
import Image from "next/image";
import Link from "next/link";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { chores, dispatch } = useChoreContext()
  const { user, loading, dispatch: userDispatch } = useAuthContext()
  const {family, dispatch: familyDispatch} = useFamilyContext()
  const [showMessage, setShowMessage] = useState(false)
  const router = useRouter()

  return (
    <>
      <Container maxWidth="xl" disableGutters>

        {/* This box is the entire green background on the top of the screen */}
        <Box
          sx={{
              display: 'flex',
              flexDirection: {xs: 'column', md: 'row'},
              // alignItems: 'center',
              // justifyContent: 'center',
              width: '100vw',
              height: '100vh',
              bgcolor: 'var(--darker-green)', //this is what gives the box its green color
              paddingTop: {xs:'10%', md: '5%'},
          }}
        >
          <Box
          sx={{
              display: 'flex',
              flexDirection:'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: '100%',
              padding: '5%',
          }}
          >
            <Typography gutterBottom variant="h3" component="div" sx={
              { color: "var(--lighter-green)", margin: 2, textAlign: {xs: 'center', md:"start"}, 
              }
              }>
                Make Chores Simple and Organized
                {/* <strong> Make Chores Simple and Organized </strong> */}
            </Typography>
            
            {/* Spacing between the header and catch phrase; this is the first thing you will see */}
            <br/>
            <br/>
            <br/>
            <br/>

            
            <Typography gutterBottom variant="h5" component="div" sx={
              { color: "var(--lighter-green)", margin: 2, textAlign: {xs: 'center', md:"start"},
              marginTop: {xs: 5}
              }
              }>
                {/* Get Started with Obligo and bring organization to your home today */}
              <strong> Get Started with Obligo and bring organization to your home today </strong>
            </Typography>

            {/* <br/>
            <br/>
            <br/> */}

          </Box>
        </Box>

        <br/>
        <br/>

        {/* FIRST ROW OF SHOWCASE
            FIRST ROW OF SHOWCASE
        */}
        
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginBottom: {xs: 12, md: 8},
            marginTop: {xs: 4, md: 0}
            }}>

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4},
              width: {md: '40%'},
              }}>

          
            
                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> Team up to tackle chores together! </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      {/* <strong>  */}
                        Build your family group and assign chores to each member effortlessly. 
                        Obligo ensures everyone knows what to do and when to do it.
                      {/* </strong> */}
                  </Typography >
                </Typography>
              </Box> {/* End of left half of row*/}
              
              <Box sx = {{}}>
                <Image 
                src="/Family.png"
                width= '700'
                height= '700'
                alt="Family Page"
                />
              </Box>

            </Box>

            {/* BOX FOR SECOND ROW OF FEATURE SHOWCASE
                BOX FOR SECOND ROW OF FEATURE SHOWCASE
            */}  

          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginTop: {xs: 4, md: 0}
            }}>
              
              {/* want this to be on left side on medium screens but this shows up above the text on small screens
              Therefore i have to disable it for small screens */}
              <Box sx = {{ display: {xs: 'none', md: 'flex'}, width: '100%'}}>
                <Image
                src="/dashboard.png"
                width= '700'
                height= '700'
                alt="Dashboard Page"
                />
              </Box>

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4} //overrides earlier margin bottom of 4 above
              // width: '100%',
              }}>

                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> All your tasks in one place. </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      Stay on top of your to-dos with a centralized dashboard showing every chore, 
                      its details, and deadlines—no more guessing who’s doing what!
                  </Typography >
                </Typography>
              </Box> {/* End of right half of row*/}

              <Box sx = {{ display: {xs: 'block', md: 'none'}}}>
                <Image
                src="/dashboard.png"
                width= '700'
                height= '700'
                alt="Dashboard Page"
                />
              </Box>
            </Box>


            {/* BOX FOR THIRD ROW OF SHOWCASE */}
            {/* BOX FOR THIRD ROW OF SHOWCASE */}
            {/* BOX FOR THIRD ROW OF SHOWCASE */}

            <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginTop: {xs: 4, md: 0},
            marginBottom: {xs: 12, md: 20}
            }}>
            

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4}, //overrides earlier margin bottom of 4 above
              width: {md: '40%'}, //no width for sm cuz it fucks everything up
              }}>

                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> Assign tasks in seconds. </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      Delegate chores with just a few clicks. Obligo makes assigning and managing 
                      tasks easy, so you can spend less time planning and more time doing.
                  </Typography >
                </Typography>
              </Box> {/* End of right half of row*/}

              <Box sx = {{}}>
                <Image
                src="/assign.png"
                width= '700'
                height= '700'
                alt="Assign Page"
                />
              </Box>

            </Box>
            
            {/* THIS IS THE FOOTER
                THIS IS THE FOOTER
                THIS IS THE FOOTER
            */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                bgcolor: 'var(--darker-green)', //this is what gives the box its green color
                padding: {xs:'10%', md: '5%'},
              }}
            >
              <Button
                variant="contained"
                href="/login"
                sx={{backgroundColor: "var(--lighter-green)", '&:hover': {'backgroundColor': 'var(--lighter-green)'},
                  width: '70%'
                }}
              >
                <Typography sx ={{color: 'var(--text-color)'}}>
                  Get Started
                </Typography>
             </Button>

            </Box>
            
      </Container>
    </>
  )
}
