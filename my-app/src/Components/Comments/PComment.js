import { Paper, Grid, Avatar } from '@mui/material';

const PComment = (props) => {

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  
// We insert this date ob
const createdAt =new Date(props.createdAt);

  return (
    
    <div>
      <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "20px 10px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="user profile pic"  />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h7 style={{ margin: 0, textAlign: "left" }}>{props.username}</h7>
            <p style={{ textAlign: "left" }}>
            {props.body}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {timeSince(createdAt)} ago 
              
            </p>
          </Grid>
        </Grid>
        </Paper>
    </div>
    </div>
  );
};
export default PComment;

