import React, { useState, useEffect } from 'react';
import { useCreateChore } from '@/hooks/useCreateChore';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useFamilyContext } from '@/hooks/useFamilyContext';

// Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker} from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs'
import Alert from '@mui/material/Alert';



const theme = createTheme({
  palette: {
    primary: {
      main: "#9e8772",
      contrastText: '#fff',
    },
  },
});

const ChoreForm = () => {
  const {family, dispatch: familyDispatch} = useFamilyContext()
  const {user} = useAuthContext()
  const { createChore, username, isLoading, error, isSuccess, setIsSuccess, emptyFields} = useCreateChore();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(dayjs())
  const [points, setPoints] = useState('')
  const [assigned_user, setAssigned_user] = useState("")

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Chore created")
    console.log("Title", title)
    console.log("Description", description)
    console.log("Due Date", dueDate)
    console.log("Points", points)
    console.log("Assigned", assigned_user)

    await createChore(title, description, dueDate, points, assigned_user)
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("")
      setDescription("")
      setDueDate(dayjs())
      setPoints("")
      setAssigned_user("")

      // Hide success message after 4 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(()=> {
    const fetchFamily = async() => {
      const familyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/family/${user.familyId}`,
        {headers: {"Authorization": `Bearer ${user.token}`}}
      )

      const familyJson = await familyResponse.json()

      if(!familyResponse.ok) {
          setError(familyJson.error)
      } else {
          familyDispatch({type: 'SET_FAMILY', payload: familyJson})
      }
    }

    //fetch the family if the user has a family ID that's not null and family state is null
    if(user.familyId && !family) {
      fetchFamily()
    }

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="false">
      {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}
      {isSuccess && <Alert sx={{marginTop:2}}severity='success'> Chore Successfully Created </Alert>}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "#9e8772", padding: 2, fontWeight: "bold" }}
        >
          Create a Chore
        </Typography>

        <TextField
          required
          error={emptyFields.includes("title")}
          id="filled-search"
          label="Chore Title"
          type="search"
          color="primary"
          fullWidth
          margin="normal"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          //sx ={{color: "#f5f5d5"}}
        />

        <TextField
          required
          error={emptyFields.includes("description")}
          id="filled-search"
          label="Chore Description"
          type="search"
          color="primary"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={description}
          onChange={e=>setDescription(e.target.value)}
          inputProps={{ maxLength: 500 }}
          sx={{marginBottom:3,}}
        />

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            error={true}
            value={dueDate}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField error={true} {...params} fullWidth />}
            onChange={date=>setDueDate(date)}
          />
        </LocalizationProvider>

        {/* Input box for points */}
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
          inputProps={{ maxLength: 2 }}
          onChange={e => {
            const numericInput = e.target.value.replace(/\D/g, '')
            setPoints(numericInput !== '' ? numericInput : '')
          }}
        />

        {/* Select component for assigning a chore to a family member*/}
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={assigned_user}
          error={emptyFields.includes("assigned_user")}
          label="Assign To"
          onChange={e => setAssigned_user(e.target.value)}
        >

          <MenuItem value={user._id}>Me</MenuItem> 


          {family && family.members.map((member) => (
            (member._id!==user._id && (
            <MenuItem key={member._id} value={member._id}> {member.username} </MenuItem>
          ))))}
        </Select>
      </FormControl>

      {/* Select Component for */}


      {/* Create Chore Button*/}
      <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 3, mb: 2, backgroundColor: "#81a651", "&:hover": {backgroundColor: "#81a651"} }}
      >
      Create Chore
      </Button>

      </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChoreForm;
