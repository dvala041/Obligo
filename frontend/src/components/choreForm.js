import { useState, useEffect } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/router';

// Components
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff',
    },
  },
});

const ChoreForm = () => {
  const { login, isLoading, error } = useLogin();
  const [assigned_user, setAssigned_user] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="false">
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "green", padding: 2, fontWeight: "bold" }}
        >
          Create a Chore
        </Typography>

        <TextField
          required
          id="filled-search"
          label="Chore Title"
          type="search"
          color="primary"
          fullWidth
          margin="normal"
        />

        <TextField
          required
          id="filled-search"
          label="Chore Description"
          type="search"
          color="primary"
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic date picker"
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>




        {/* Input box for points */}
        <TextField
          id="outlined-number"
          label="Points"
          type="number"
          fullWidth
          margin="normal"
          placeholder='Points'
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Select component for assigning a chore to a family member*/}
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={assigned_user}
          label="Assign To"
          onChange={e => setAssigned_user(e.target.value)}
        >
          <MenuItem value={0}> <em> Everyone </em> </MenuItem>
          <MenuItem value={10}>David</MenuItem>
          <MenuItem value={20}>Eric</MenuItem>
          <MenuItem value={30}>Mami</MenuItem>
        </Select>
      </FormControl>

      {/* Select Component for */}

      </Container>
    </ThemeProvider>
  );
};

export default ChoreForm;
