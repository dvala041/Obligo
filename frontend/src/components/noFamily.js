import { useFamilyContext } from "@/hooks/useFamilyContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal, Box, Button, Container, Typography, TextField } from "@mui/material";
import { useCreateFamily } from "@/hooks/useCreateFamily";
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: "#9e8772",
        contrastText: '#fff',
      },
    },
  });


const NoFamily = ({data}) => {
    const {createFamily, isLoading, error, setError, isSuccess, setIsSuccess, emptyFields, setEmptyFields} = useCreateFamily()
    const {family, dispatch: familyDispatch} = useFamilyContext()
    const [familyName, setFamilyName] = useState("")

    const { user, loading, dispatch: userDispatch } = useAuthContext()
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setError(false)
        setFamilyName("")
        setEmptyFields([])
    }

    const handleCreateFamiy = async(e) => {
        e.preventDefault()
        await createFamily(familyName, user._id)
    }

    //Successfully submitted:
    useEffect(() => {
        if (isSuccess) {
          setFamilyName("")
          handleClose()
    
          // Hide success message after 4 seconds
          setTimeout(() => {
            setIsSuccess(false)
          }, 3000);
        }
      }, [isSuccess]);

      return (
        <>
            <Container maxWidth="xl" sx={{ mt: {xs: 30, md: 20} }}>
            {/* {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>} */}
            {/* {isSuccess && <Alert sx={{marginTop:2}}severity='success'> Family Successfully Created </Alert>} */}
                <Box sx  = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: { xs: 'center' },
                }}>
                    {isSuccess && <Alert sx={{marginTop:2}}severity='success'> Family Successfully Created </Alert>}
                    <Typography sx={{color: '#9e8772', textAlign: 'center'}}>
                        Looks like you don't have a family. <strong> Create one or get invited to one! </strong>
                    </Typography>

                    <Button onClick={handleOpen} sx ={{
                        textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:2, md: 4}, '&:hover': {'backgroundColor': '#81a651'}
                        }}>
                        + Create Family
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box component="form" noValidate onSubmit={handleCreateFamiy} sx  = {data}>
                        {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}
                            <Typography sx={{color: '#9e8772', fontWeight: 'bold'}}>
                                Create Family
                            </Typography>
                            <ThemeProvider theme={theme}>
                            <TextField
                                required
                                error={emptyFields.includes("name")}
                                id="filled-search"
                                label="Family Name"
                                type="search"
                                color="primary"
                                fullWidth
                                margin="normal"
                                value={familyName}
                                onChange={e=>setFamilyName(e.target.value)}
                                sx={{color: '#9e8772'}}
                            >
                            </TextField>
                            </ThemeProvider>
                            <Button type="submit" disabled={isLoading} sx ={{
                                textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:1, md: 2}, alignSelf: 'center',
                                '&:hover': {'backgroundColor': '#81a651'}
                                }}>
                                Create Family
                            </Button>
                        </Box>

                    </Modal>
                </Box>

            </Container>
            </>
      )

}

export default NoFamily