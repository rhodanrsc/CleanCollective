import React, { Component } from 'react'
import PostCard from './Post.Card';
import axios from 'axios';

export class PostPage extends Component {

state = {
    postTitle: '',
    postBody: '',
    posts: []
}

//Get the User Post Data
componentDidMount = () => {
    this.getAllUserPost();
}

getAllUserPost = () => {
    axios.get('/userpost').then((response) => {
    const data = response.data;
    this.setState({posts:data});    
    console.log('User post data pulled form DB');}).catch(() => {alert("Error pulling user post data");
});
}

// Map and display the users posts
displayUserPost = (posts) => {
    //checks if there are no posts
    if(!posts.length) return null;

return posts.map((post, index) => {
    <div key={index}>
    <h3>{posts.postTitle}</h3>
    <p>{posts.postBody}</p>
    </div>
    });
}

  render() {
    return (<div>
        <PostCard/>
     <div className="userPost">{this.displayUserPost(this.state.posts)} </div>
     </div>
    )
  }
}

export default PostPage;