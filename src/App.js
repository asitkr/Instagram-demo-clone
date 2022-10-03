import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Modal, Box, Button, Input } from "@mui/material";
import ImageUpload from "./ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
};

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "Ashit",
    //   caption: "Heelo Intragram i am here",
    //   imageUrl: "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
    // },
    // {
    //   username: "Radha",
    //   caption: "Heelo Intragram Queen",
    //   imageUrl: "https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg"
    // },
    // {
    //   username: "Anushka",
    //   caption: "Dancer",
    //   imageUrl: "https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-1520x800.jpeg"
    // },
  ]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // console.log(posts);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        // console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //don't update username
        } else {
          //if we created someone...
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user has logged out...
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshort) => {
        setPosts(
          snapshort.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      // .then((authUser) => {
      //   setUser(authUser);
      // })
      .catch((err) => alert(err.message));

    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* Sign up modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="app__signup">
          <Box sx={style}>
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </Box>
        </form>
      </Modal>
      {/* Sign In Modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <form className="app__signup">
          <Box sx={style}>
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </Box>
        </form>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <center><h3>Please Login to Upload</h3></center>
        )}
        {posts.map((post, id) => (
          <Post
            key={id}
            postId={post.id}
            user={user}
            username={post.post.username}
            caption={post.post.caption}
            imageUrl={post.post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
