import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Circle } from '@mui/icons-material';
import { Box } from '@mui/material';

export default function EventCard({chore}) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="/wowow.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {chore.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {chore.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mark Done</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography

        >
          Late
        </Typography>
        <Circle sx={{color: "red"}} />
      </CardActions>
    </Card>
  );
}
