import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '../../shared/images/CCLogo.png'
import { useNavigate } from 'react-router-dom';

export default function ImgMediaCard() {
    const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 500, padding:2, margin:'75.2px auto'}} >
        <CardMedia
        component="img"
        alt="Clean collective"
        height="200"
        image={Logo}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Coming Soon!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The Clean Collective team is working hard to provide you services to reach your net zero goals! In the mean time, check out our forum to help you find the answers you seek!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={ () => {navigate(-1)}}>Back</Button>
        <Button size="small" onClick={ () => {navigate('/forum')}}>Forum</Button>
      </CardActions>
    </Card>
  );
}