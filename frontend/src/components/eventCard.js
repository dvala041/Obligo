import { useEffect, useState } from 'react';
import { Circle } from '@mui/icons-material';
import { Box, Paper, Modal, Typography, Button, IconButton, TextField, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMarkDone } from '@/hooks/useMarkDone';
import { useFamilyContext } from '@/hooks/useFamilyContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker} from '@mui/x-date-pickers/DatePicker';




// MODAL STYLING
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#9e8772",
      contrastText: '#fff',
    },
  },
});

const getStatusColor = (status, dueDate) => {
  const colorMap = {
    'pending': 'orange',
    'late': 'red',
    'assigned': 'green',
    'completed': 'darkgreen'
  };

  const currentDate = new Date();
  const choreDueDate = new Date(dueDate);

  currentDate.setHours(0, 0, 0, 0);
  choreDueDate.setHours(0, 0, 0, 0);

  if (status.toLowerCase() === 'assigned' && currentDate > choreDueDate) {
    return 'red'; // Late if the current date is past the due date
  }

  return colorMap[status];
};

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // hour: '2-digit',
  // minute: '2-digit',
  // second: '2-digit',
  // hour12: true
};

export default function EventCard({ chore, userId }) {
  const { markDone } = useMarkDone();
  const { family} = useFamilyContext();

  const date = new Date(chore.due_date)
  const readableDate = date.toLocaleDateString('en-US', options);

  const [title, setTitle] = useState(chore.title)
  const [description, setDescription] = useState(chore.description)
  const [dueDate, setDueDate] = useState(dayjs(chore.due_date))
  const [points, setPoints] = useState(chore.points)
  const [assignedUser, setAssignedUser] = useState(chore.assigned_user)

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenEdit = () => {setOpenEdit(true)}
  const handleCloseEdit = () => {
    setOpenEdit(false)
    setTitle(chore.title)
    setDescription(chore.description)
    setDueDate(dayjs(chore.due_date))
    setPoints(chore.points)
    setAssignedUser(chore.assigned_user)
    // setUpdateError(false)
    // setEmptyFields([])
  }

  const handleOpenDelete = () => {setOpenDelete(true)}
  const handleCloseDelete = () => {setOpenDelete(false)}

  const color = getStatusColor(chore.status.toLowerCase(), chore.due_date);

  const handleClick = async () => {
    await markDone(chore.assigned_user, chore.created_by, chore._id);
  };

  const getNameById = (id) => {
    if (!family || !family.members) {
      return 'Me'; // returns "Me" if user not in family
    }
    const member = family.members.find(member => member._id == id);
    return member ? (member._id === userId ? "Me" : member.username) : 'Unknown';
  };

  const handleSubmit = async(e, option) => {
    e.preventDefault()

    if (option === "EDIT") {
      //await updateMember(member._id, role, points, choresComplete)
      console.log("Editting chore")
    } else if (option === "DELETE") {
      console.log("DELETE CHORE")
      //await removeMember(member._id)
    }
  }

  // THIS IS NECESSARY FOR CLOSING THE MODAL AFTER A SUCCESSFUL USER UPDATE
  // useEffect(() => {
  //   if(isSuccess) {
  //       handleCloseEdit()
  //       setIsSuccess(false)
  //   }
  // }, [isSuccess])

  return (
    <> 
      <Paper elevation={24} sx={{ 
        display: 'flex', justifyContent: 'start', flexDirection: 'column',
      }}>

        {/* Chore Title and optional edit and delete buttons*/}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start'
        }}>
          {/* Chore Title */}
          <Typography gutterBottom variant="h5" component="div" sx={{ color: "var(--text-color)", margin: 2 }}>
            <strong> {chore.title.charAt(0).toUpperCase() + chore.title.slice(1)} </strong>
          </Typography>

          <Box flexGrow={1}/>

          {/* Only show these icons if we assigned it to ourselves or we assigned it to someone else */}

          {(chore.status !== "Completed" && (chore.assigned_user === chore.created_by || chore.created_by === userId)) && (
            <>
            <IconButton sx={{color: "#9e8772"}} onClick={handleOpenEdit}>
              <EditIcon/>
            </IconButton>

            <IconButton sx={{color: "#9e8772"}} onClick={handleOpenDelete}>
              <DeleteIcon/>
            </IconButton>
            </>
          )}
        </Box>

        {/* Chore description and points */}
        <Box maxWidth='100%' sx={{
          display: 'flex', justifyContent: 'start', flexDirection: 'column',
          margin: 2, wordWrap: 'break-word',
        }}>
          <Typography maxWidth="100%" sx={{ color: "var(--text-color)" }}>
            <strong> Description: </strong>
          </Typography>
          <Typography maxWidth="100%" variant="body1" sx={{ color: "var(--text-color)" }}>
            {chore.description}
          </Typography>
          <br /> 
          <br />

          <Typography maxWidth="100%" variant="body1" sx={{ color: "var(--text-color)" }}>
            <strong> Points: </strong> {chore.points}
          </Typography>

          <Typography maxWidth="100%" variant="body1" sx={{ color: "var(--text-color)" }}>
            <strong> Due: </strong> {readableDate}
          </Typography>
          
          {chore.assigned_user === userId ? (
            <Typography maxWidth="100%" variant="body1" sx={{ color: "var(--text-color)" }}>
              <strong> Assigned By: </strong> {getNameById(chore.created_by)}
            </Typography>
          ) : ( 
            <Typography maxWidth="100%" variant="body1" sx={{ color: "var(--text-color)" }}>
              <strong> Assigned To: </strong> {getNameById(chore.assigned_user)}
            </Typography>
          )}
        </Box>

        <Box sx={{
          display: 'flex', justifyContent: 'start', flexDirection: 'row',
          margin: 2
        }}>

          {/* This is the markd one button; only show it if the chore status is not complete */}
          {chore.status !== "Completed" && (
            // if the status is not pending or i did not create the chore the done button won't appear; also won't appear if complete
            <Button disabled={chore.status === "Pending" && chore.created_by !== userId} onClick={handleClick} sx={{
              backgroundColor: 'var(--darker-green)', color: 'var(--lighter-green)', textTransform: 'none',
              ":hover": { backgroundColor: 'var(--darker-green)', color: 'var(--lighter-green)' },
              ":disabled": { 'backgroundColor': 'lightgrey', 'color': 'white' }
            }}>
              Done
            </Button>
          )}

          <Box flexGrow={1} />

          <Typography sx={{ textTransform: 'none', color: 'var(--text-color)', marginRight: 1 }}>
            {chore.status}
          </Typography>

          <Circle sx={{ color: color }} />
        </Box>
      </Paper>



      {/* Modal for EDITING the chore; only all-chores page and chores assigned to ourselves should have access */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <Box noValidate component="form" onSubmit={(e) => handleSubmit(e, "EDIT")} sx={style}>
          <Typography sx={{color: "#9e8772"}}>
            <strong> Edit Chore </strong>
          </Typography>

          <ThemeProvider theme={theme}>

          {/* Edit the title */}
          <TextField
            required
            // error={emptyFields.includes("title")}
            id="filled-search"
            label="Chore Title"
            type="search"
            color="primary"
            fullWidth
            margin="normal"
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />


          {/* Edit the description */}
          <TextField
            required
            // error={emptyFields.includes("description")}
            id="filled-search"
            label="Chore Description"
            type="search"
            color="primary"
            fullWidth
            margin="normal"
            multiline
            value={description}
            onChange={e=>setDescription(e.target.value)}
            inputProps={{ maxLength: 500 }}
            sx={{marginBottom:1}}
        />

          {/* Edit the due date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              error={true}
              value={dueDate}
              sx={{ width: '100%', margin: 1 }}
              renderInput={(params) => <TextField error={true} {...params} fullWidth />}
              onChange={date=>setDueDate(date)}
            />
          </LocalizationProvider>

          {/* Edit the points */}
          <TextField
              id="outlined-number"
              value={points}
              // error={emptyFields.includes("points")}
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

          {/* Edit who its assigned to */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Assign To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedUser}
              // error={emptyFields.includes("assigned_user")}
              label="Assign To"
              onChange={e => setAssignedUser(e.target.value)}
            >
              <MenuItem value={userId}>Me</MenuItem> 

              {family && family.members.map((member) => (
                (member._id!==userId && (
                <MenuItem key={member._id} value={member._id}> {member.username} </MenuItem>
              ))))}
            </Select>
          </FormControl>


          {/* Submit changes button */}
          <Button type="submit" sx ={{
            textTransform: 'none', backgroundColor: '#81a651', color: 'white', mt: {xs:2}, alignSelf: 'center',
            '&:hover': {'backgroundColor': '#81a651'}, width:"50%"
            }}>
              Done
          </Button>

          </ThemeProvider>
        </Box>
      </Modal>
      
      {/* DELETE CHORE MODAL */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <Box noValidate component="form" onSubmit={(e) => handleSubmit(e, "DELETE")} sx={style}>
          <Typography sx={{color: "#9e8772"}}>
            <strong>Are you sure you want to delete this chore? </strong>
          </Typography>

          <Button type="submit" sx ={{
          textTransform: 'none', backgroundColor: '#cd0037', color: 'white', mt: {xs:2}, alignSelf: 'center',
          '&:hover': {'backgroundColor': '#cd0037'}, width:"50%"
          }}>
            Delete
          </Button>
        </Box>
      </Modal>


      {/* Modal for deleting the chore; only all-chores page and chores assigned to ourselves should have access  */}
    </>
  );
}
