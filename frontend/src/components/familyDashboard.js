import { useFamilyContext } from "@/hooks/useFamilyContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import MemberCard from "./memberCard";
import { useAddMember } from "@/hooks/useAddMember";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Components
import { Avatar, Box, Button, Container, Paper, Typography, Modal, TextField, Select, MenuItem, Alert, 
    InputLabel, FormControl
 } from "@mui/material";



const theme = createTheme({
    palette: {
      primary: {
        main: "#9e8772",
        contrastText: '#fff',
      },
    },
  });

const FamilyDashboard = ({ data }) => {
    const { dispatch: familyDispatch, family } = useFamilyContext();
    const {user} = useAuthContext()
    const {addMember, isLoading, error, setError, isSuccess, setIsSuccess, emptyFields, setEmptyFields} = useAddMember()
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [open, setOpen] = useState(false);



    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setError(false)
        setUsername("")
        setRole("")
        setEmptyFields([])
    }




    const handleSubmit= async(e, action) => {
        e.preventDefault()
        if(action === "ADD_MEMBER") {
            await addMember(username, role)
            console.log("MEMBER ADDED")
        } else if (action === "LEAVE_FAMILY") {
            console.log("Left family")
        }
        handleClose()
    }
    return (
        <>
            <Container maxWidth="xl" disableGutters>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            mt: { xs: 2, md: 4 },
                            color: '#9e8772',
                        }}
                    >
                        {family.name}
                    </Typography>
                </Box>

                {/* A box that organizes the MemberCards and buttons in a row on medium screens */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row', // changed to column for better stacking
                        alignItems: 'center',
                        gap: 2
                        //width: {xs: '90%', md:'50%'},
                        //margin: {xs: 2, md: 4}, // Adding margin-top for spacing
                    }}
                >
                    {/* Display family info cards */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', // changed to column for better stacking
                            alignItems: 'center',
                            width: {xs: '90%', md:'60%'},
                            margin: {xs: 2, md: 4}, // Adding margin-top for spacing
                        }}
                    >
                        {family && family.members.map(member => (
                            <MemberCard key={member._id} member={member}/>
                        ))}
                    </Box>

                {/* Add member and leave family buttons appear on the side on big screens*/}
                    <Box sx= {{
                        display: {xs: 'none', md: 'flex'},
                        flexDirection: 'column', // changed to column for better stacking
                        alignItems: 'center',
                        width: {md:'40%'},
                        margin: {xs: 2, md: 4}, // Adding margin-top for spacing
                        
                        }}>

                        {/* THIS BUTTON OPENS THE MODAL FOR ADDING A FAMILY MEMBER ON MEDIUM SCREENS */}
                        <Button onClick={handleOpen} sx ={{
                            textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:1, md: 2}, alignSelf: 'center',
                            '&:hover': {'backgroundColor': '#81a651'}, width: '60%'
                            }}>
                            Add Member
                        </Button>
                        <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box component="form" noValidate onSubmit={(e)=>handleSubmit(e, "ADD_MEMBER")} sx  = {data}>
                        {error && <Alert sx={{marginBottom:2}} severity="error">{error}</Alert>}
                            <Typography sx={{color: '#9e8772', fontWeight: 'bold'}}>
                                Add Family Member
                            </Typography>
                            <ThemeProvider theme={theme}>
                            <TextField
                                required
                                error={emptyFields.includes("username")}
                                id="filled-search"
                                label="Username"
                                type="search"
                                color="primary"
                                fullWidth
                                //margin="normal"
                                value={username}
                                onChange={e=>setUsername(e.target.value)}
                                sx={{color: '#9e8772'}}
                            >
                            </TextField>

                            {/* DROPDOWN FOR SELECTING ROLE */}
                            {/* Select component for assigning a chore to a family member*/}
                            <FormControl fullWidth sx={{marginTop: 1}}>
                                <InputLabel id="demo-simple-select-label"> Role</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                required
                                error={emptyFields.includes("role")}
                                label="Assign To"
                                onChange={e => setRole(e.target.value)}
                                >

                                    <MenuItem value="Admin"> Admin </MenuItem>
                                    <MenuItem value="Member"> Member </MenuItem>
                                </Select>
                            </FormControl>


                            </ThemeProvider>
                            <Button type="submit" disabled={isLoading} sx ={{
                                textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:1, md: 2}, alignSelf: 'center',
                                '&:hover': {'backgroundColor': '#81a651'}, 
                                }}>
                                Add Member
                            </Button>
                        </Box>

                        </Modal> 
                        {/* if passing additoinal arguments to the handleSubmit you must use an arrow function to prevent
                            the function from being called immediately; doing this makes the function a reference to be called when 
                            the component renders. If you don't do this arrow function, e will be undefined

                        */}
                        <form style={{width: '60%' }} noValidate onSubmit={(e)=>handleSubmit(e,"LEAVE_FAMILY")}> 
                        <Button type="submit" sx ={{
                            textTransform: 'none', backgroundColor: '#cd0037', color: 'white', mt: {xs:1, md: 2}, alignSelf: 'center',
                            '&:hover': {'backgroundColor': '#cd0037'}, width: "100%"
                            }}>
                            Leave Family
                        </Button>
                        </form>
                    </Box>
                </Box> {/* End of row box: MemberCard | Buttons  (medium screens*/}



                {/* I want the buttons on the bottom for small screens */}
                <Box sx= {{
                        display: {xs: 'flex', md: 'none'},
                        flexDirection: 'column', // changed to column for better stacking
                        alignItems: 'center',
                        width: {xs:'100%'},
                        marginTop: {xs: 2}, // Adding margin-top for spacing
                        
                        }}>
                        <form style={{width: '80%' }} noValidate onSubmit={(e)=>handleSubmit(e, "ADD_MEMBER")}>
                        <Button type="submit" sx ={{
                            textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:1}, alignSelf: 'center',
                            '&:hover': {'backgroundColor': '#81a651'}, width: '100%'
                            }}>
                            Add Members
                        </Button>
                        </form>
                        {/* if passing additoinal arguments to the handleSubmit you must use an arrow function to prevent
                            the function from being called immediately; doing this makes the function a reference to be called when 
                            the component renders. If you don't do this arrow function, e will be undefined

                        */}
                        <form style={{width: '80%' }} noValidate onSubmit={(e)=>handleSubmit(e,"LEAVE_FAMILY")}> 
                        <Button type="submit" sx ={{
                            textTransform: 'none', backgroundColor: '#cd0037', color: 'white', mt: {xs:1}, alignSelf: 'center',
                            '&:hover': {'backgroundColor': '#cd0037'}, width:"100%", marginBottom: 4
                            }}>
                            Leave Family
                        </Button>
                        </form>
                    </Box>

            </Container>
        </>
    );
};

export default FamilyDashboard;
