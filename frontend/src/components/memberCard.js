import { Avatar, Box, IconButton, Container, Paper, Typography, Modal, Button, TextField,
Select, InputLabel, MenuItem, FormControl, Alert
 } from "@mui/material";

import { useAuthContext } from "@/hooks/useAuthContext";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import {useRemoveMember} from '../hooks/useRemoveMember'
import { useUpdateMember } from "@/hooks/useUpdateMember";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#9e8772",
        contrastText: '#fff',
      },
    },
  });

const MemberCard = ({member, data}) => {
    const [role, setRole] = useState(member.role)
    const [points, setPoints] = useState(member.points)
    const [choresComplete, setChoresComplete] = useState(member.choresComplete)


    const {user} = useAuthContext()
    const {removeMember, error, setError, isLoading, setIsLoading} = useRemoveMember()
    const {updateMember, error: updateError, setError: setUpdateError, 
        isLoading: updateLoading, setIsLoading: setUpdateLoading, emptyFields, setEmptyFields,
        isSuccess, setIsSuccess} = useUpdateMember() 
    console.log("MEMBER: ", member)

    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const handleRemoveUser = () => {
        console.log("CURRENT MEMBER:", member)
    }

    const handleEditUser = () => {
        console.log("CURRENT MEMBER:", member)
    }

    const handleOpenEdit = () => {setOpenEdit(true)} 
    const handleCloseEdit = () => {
        setOpenEdit(false)
        setRole(member.role)
        setPoints(member.points)
        setChoresComplete(member.choresComplete)
        setUpdateError(false)
        setEmptyFields([])
    }

    const handleOpenRemove = () => { setOpenRemove (true)}
    const handleCloseRemove = () => {setOpenRemove(false)}

    const handleSubmit = async(e, option) => {
        e.preventDefault()

        if (option === "EDIT") {
            await updateMember(member._id, role, points, choresComplete)
            console.log("Editting user")
        } else if (option === "REMOVE") {
            await removeMember(member._id)
        }
    }

    // THIS IS NECESSARY FOR CLOSING THE MODAL AFTER A SUCCESSFUL USER UPDATE
    useEffect(() => {
        if(isSuccess) {
            handleCloseEdit()
            setIsSuccess(false)
        }
    }, [isSuccess])

    return (
        <>
        <Paper elevation={24} sx={{ marginBottom: 2, padding: 2, width: '100%' }}>

            {/* This box holds everything inside */}
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md:'row'},
                color: "#9e8772",
                //alignItems: 'start',
                gap: 3
            }}>

                {/* This box is for the avatar on all screens and the EDIT and REMOVE ICONS on SMALL SCREENS */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start'
                }}>
                    <Avatar alt={member.username.charAt(0).toUpperCase()} src="/static/images/avatar/2.jpg" /> 
                    <Box sx={{display: {xs:'flex', md: 'none'}}} flexGrow={1}/>
                    {(user.role ==="Admin" || user.role === "Owner")&& (
                     <>  
                     <IconButton sx={{color: "#9e8772", display: {xs:'flex', md: 'none'}}} onClick={handleOpenEdit}>
                        <EditIcon sx={{display: {xs:'flex', md: 'none'}}}/>
                    </IconButton>
                     {/* OTHER MEMBERS CARDS ON SMALL SCREENS (ICONS NOT DISABLED) */}
                     {member._id !== user._id ? (
                        <>
                        <IconButton sx={{color: "#9e8772", display: {xs:'flex', md: 'none'}}} onClick={handleOpenRemove}>
                            <PersonRemoveIcon sx={{display: {xs:'flex', md: 'none'}}}/>
                        </IconButton>
                    </>
                    // YOUR OWN MEMBER CARD ON SMALL SCREENS (DISABLES EDIT AND REMOVE ICONS)
                     ) : (
                        <>
                        <IconButton disabled sx={{ color: "#9e8772", display: { xs: 'flex', md: 'none' } }} onClick={handleRemoveUser}>
                            <PersonRemoveIcon />
                        </IconButton>
                        </>
                     )}
                    </>
                    
                    )}
                </Box>

                {/* Wrapper box for the two columns */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between', // Aligns items within the columns
                    width: '100%' // Ensures the columns take up the full width
                }}>

                    {/* This box holds the first column inside */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        flex: 1 //this adds space after this box (to the right; in between both columns)
                    }}>

                        {error && <Alert sx={{marginBottom:2}} severity="error">{error}</Alert>}
                        {/* Small Screens  have everything in one column*/}
                        <Typography>
                            <strong> Username: </strong> {member.username} 
                        </Typography>
                        <Typography>
                            <strong> Role: </strong> {member.role}
                        </Typography>
                        <Typography sx={{display: {md:"none"}}}>
                            <strong> Points: </strong> {member.points}
                        </Typography>
                        <Typography sx={{display: {md:"none"}}}>
                            <strong> Chores Complete: </strong> {member.choresComplete}
                        </Typography>
                    </Box>  

                    <Box flexGrow={1} sx={{display: {xs: 'none', md: 'flex'}}}/> 

                    {/* Big screens have everything in two rows. this box is the second column */}
                    <Box sx={{
                        display: {xs: 'none', md: 'flex'},
                        flexDirection: 'column',
                        alignItems: 'start',
                        flex: 1 //this adds space after this box (to the right)
                    }}>
                        <Typography>
                            <strong> Points: </strong> {member.points}
                        </Typography>
                        <Typography>
                            <strong> Chores Complete: </strong> {member.choresComplete}
                        </Typography>
                    </Box>
                </Box>

                {/* ICON BUTTONS FOR BIG SCREENS */}
                {(user.role ==="Admin" || user.role === "Owner") && (
                <>
                <Box sx={{ display: { xs: "none", md: "flex" } }} flexGrow={1} />
                    <IconButton sx={{ color: "#9e8772", display: { xs: 'none', md: 'flex' } }} onClick={handleOpenEdit}>
                        <EditIcon />
                    </IconButton>
                {member._id !== user._id ? ( 
                    <>
                        <IconButton sx={{ color: "#9e8772", display: { xs: 'none', md: 'flex' } }} onClick={handleOpenRemove}>
                            <PersonRemoveIcon />
                        </IconButton>
                      
                    </>
                ) : (
                    <>
                        <IconButton disabled sx={{ color: "#9e8772", display: { xs: 'none', md: 'flex' } }} onClick={handleRemoveUser}>
                            <PersonRemoveIcon />
                        </IconButton>
                    </>
                )}
                </>
                )}
                
            </Box> 
        </Paper>

        {/* EDIT USER MODAL */}
        <Modal
            open={openEdit}
            onClose={handleCloseEdit}
        >
            <Box noValidate component="form" onSubmit={(e) => handleSubmit(e, "EDIT")} sx={data}>
            {updateError && <Alert sx={{marginBottom:2}} severity="error">{updateError}</Alert>}
                <Typography sx={{color: "#9e8772"}}>
                    <strong> Edit {member.username} </strong>
                </Typography>
                <ThemeProvider theme={theme}>
                <TextField
                    id="outlined-number"
                    value={points}
                    error={emptyFields.includes("points")}
                    label="Points"
                    type="text" //don't do type="number" cuz it fucks things up
                    fullWidth
                    margin="normal"
                    placeholder='Points'
                    required
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={e => {
                    const numericInput = e.target.value.replace(/\D/g, '')
                    setPoints(numericInput !== '' ? numericInput : '')
                    }}
                >
                </TextField>

                <TextField
                    id="outlined-number"
                    value={choresComplete}
                    error={emptyFields.includes("choresComplete")}
                    label="Chores Complete"
                    type="text" //don't do type="number" cuz it fucks things up
                    fullWidth
                    margin="normal"
                    placeholder='Chores Complete'
                    required
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={e => {
                    const numericInput = e.target.value.replace(/\D/g, '')
                    setChoresComplete(numericInput !== '' ? numericInput : '')
                    }}
                >
                </TextField>

                {/* DROPDOWN FOR SELECTING ROLE */}
                {/* Select component for assigning a chore to a family member*/}
                <FormControl fullWidth sx={{marginTop: 1}}>
                    <InputLabel id="demo-simple-select-label"> Role</InputLabel>
                    <Select
                    disabled={member.role ==="Owner"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    required
                    error={emptyFields.includes("role")}
                    label="Role"
                    onChange={e => setRole(e.target.value)}
                    >

                        <MenuItem value="Admin"> Admin </MenuItem>
                        <MenuItem value="Member"> Member </MenuItem>
                        {(member.role === "Owner" || user.role === "Owner") && (
                            <MenuItem value="Owner"> Owner (only 1 per family)  </MenuItem>
                        )}
                    </Select>
                </FormControl>


                </ThemeProvider>


                <Button type="submit" sx ={{
                textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:2}, alignSelf: 'center',
                '&:hover': {'backgroundColor': '#81a651'}, width:"50%"
                }}>
                    Done
                </Button>
            </Box>
        </Modal>


        {/* REMOVE USER MODAL */}
        <Modal
            open={openRemove}
            onClose={handleCloseRemove}
        >
            <Box noValidate component="form" onSubmit={(e) => handleSubmit(e, "REMOVE")} sx={data}>
                <Typography sx={{color: "#9e8772"}}>
                    <strong>Are you sure you want to remove {member.username}? </strong>
                </Typography>
                <Button type="submit" sx ={{
                textTransform: 'none', backgroundColor: '#cd0037', color: 'white', mt: {xs:2}, alignSelf: 'center',
                '&:hover': {'backgroundColor': '#cd0037'}, width:"50%"
                }}>
                    Remove
                </Button>
            </Box>
        </Modal>
        
        </>
    )
}

export default MemberCard