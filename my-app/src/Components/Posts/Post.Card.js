import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ToggleButton from "@mui/material/ToggleButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ReactSession } from "react-client-session";
let userSession = ReactSession.get("userSession");

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//Get the User Post Data
function getUserPost() {
  alert("get post button clicked");
  axios({ method: "GET", url: "http://localhost:5000/user.post.route/" })
    .then(() => {
      console.log("User post data pulled form DB");
    })
    .catch(() => {
      alert("Error pulling user post data");
    });
}



export default function PostCard(props) {
  function like() {
    axios.post("http://localhost:5000/user.post.route/likePost/" + props.id, {
  
  })
  }

  const [expanded, setExpanded] = React.useState(false);
  const [selectedLike, setSelectedLike] = React.useState(false);
  const [selectedDislike, setSelectedDislike] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.body}
          <p>{props.id}</p>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <div className="d-flex fd-column">

          <ToggleButton
            value="check"
            size="small"
            color="success"
            selected={selectedLike}
            onChange={() => {
              like();
              setSelectedLike(!selectedLike);
              if(selectedDislike){
              setSelectedDislike(!selectedDislike);
              }
            }}
          >
            <ArrowDropUpIcon/>

          </ToggleButton>
          <Typography>{props.likes}</Typography>

        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <button onClick={getUserPost}>Get user Post</button>
        <div style={{ padding: "10px" }}>{"~" + props.username}</div>
      </CardActions>
    </Card>
  );
}

