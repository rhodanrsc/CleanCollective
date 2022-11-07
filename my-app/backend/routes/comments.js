const router = require('express').Router();
const Comment = require('../models/user.comments');

// returns a list of comments for the current user 
router.route('/').get((req, res) =>{
    Comment.UserCommentCollection.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: Couldnt return list of Comments - ' + err));
});

// adds a new comment
router.route("/addComment").post((req, res) => {
  const comment_user_Id = req.body.commentUserId; 
  const comment_body = req.body.commentBody;
  const comment_ParentId = req.body.commentParentId;
  const new_comment = new Comment.UserCommentCollection({
    commentUserId: comment_user_Id,
    commentBody: comment_body,
    commentParentId: comment_ParentId,
  });

  new_comment.save()
    .then(() => res.json("Comment added!"))
    .catch((err) => res.status(400).json("Error: Could not add a comment - " + err));
});

//Delete a comment via username
/*router.route('/delete/:id').post((req, res) => {
  Comment.UserCommentCollection.findById(req.params.id)
  .then(user => {
    let validCredentials = bcrypt.compareSync(currentPassword, user.password);
    if(validCredentials && currentPassword === confirmPassword){
        Comment.UserCommentCollection.findByIdAndDelete(req.params.id)
        .then(
          res.send("Comment successfully deleted")
        )
        .catch(err => res.status(400).json('Error: ' + err));
    } else{
      res.send("passwordError")
    } 
  })
}) */
module.exports = router;