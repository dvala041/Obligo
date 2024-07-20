import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import { useAuthContext } from "@/hooks/useAuthContext";


const MemberCard = ({member}) => {
    const {user} = useAuthContext()
    console.log("MEMBER: ", member)

    return (
        <>
        <Paper elevation={24} sx={{ marginBottom: 2, padding: 2, width: '100%' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md:'row'},
                color: "#9e8772",
                //alignItems: 'start',
                gap: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar alt={member.username} src="/static/images/avatar/2.jpg" /> 
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    marginRight: {xs: 'none', md: 20}
                
                }}>
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

                <Box sx={{
                    display: {xs: 'none', md: 'flex'},
                    flexDirection: 'column',
                    alignItems: 'start'
                }}>
                    <Typography>
                        <strong> Points: </strong> {member.points}
                    </Typography>
                    <Typography>
                        <strong> Chores Complete: </strong> {member.choresComplete}
                    </Typography>
                </Box>   
            </Box>
        </Paper>
        
        </>
    )
}

export default MemberCard