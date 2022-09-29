import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import { db } from "./firebase";
import firebase from 'firebase/compat/app';

function Post({ postId, user, username, caption, imageUrl }) {
  // console.log(username, imageUrl);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [avatarName, setAvatarName] = useState('');

//   console.log(comments);
//   console.log(comment);
  console.log(avatarName);

  useEffect(() => {

    // let name = user.displayName.substring(0,1).toUpperCase();
    // setAvatarName(name);

    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
        unsubscribe();
    }
  }, [postId]);

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                >{username.substring(0,1).toUpperCase()}</Avatar>
                <h3>{username}</h3>
            </div>

            <img className="post__image" src={imageUrl} alt="image" />

            <h4 className="post__text">
                <strong>{username}</strong> {caption}
            </h4>

            {
                <div className="post__comments">
                    {
                        comments.map((comment, id) => (
                            <p key={id}>
                                <b>{comment.username}</b> {comment.text}
                            </p>
                        ))
                    }
                </div>
            }

            {
                user && (
                    <form className="post__commentBox">
                        <input
                            type="text"
                            className="post__input"
                            value={comment}
                            placeholder="Add a comment..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="post__button"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </form>
                )
            }
        </div>
    );
}

export default Post;
