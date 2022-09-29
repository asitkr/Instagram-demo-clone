import firebase from "firebase/compat/app";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import "./ImageUpload.css";

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

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  // const [openUpload, setOpenUpload] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (err) => {
        // error function...
        console.log(err);
        alert(err.message);
      },
      () => {
        // complete case
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    // <div className='image__upload'>
    //     <progress className='image__progress' value={progress} max='100' />
    //     <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Enter a caption...' />
    //     <input type="file" onChange={handleChange} />
    //     <Button onClick={handleUpload}>Upload</Button>

    //     <h1>Hello</h1>
    //     {/* <Modal open={openUpload} onClose={() => {}}>
    //         <Box sx={style}>
    //             <center>
    //                 <img
    //                     className="app__headerImage"
    //                     src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    //                     alt=""
    //                 />
    //             </center>
    //             <Button>hello</Button>
    //         </Box>
    //     </Modal> */}

    <>
      <Button style={{marginLeft: '10px'}} variant="contained" onClick={handleOpen}>Post</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <progress className="image__progress" value={progress} max="100" />
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter a caption..."
            />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
          </Box>
        </Fade>
      </Modal>
      {/* // </div> */}
    </>
  );
}

export default ImageUpload;
