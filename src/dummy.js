const dummy = () => {
    return (
        <div className='image__upload'>
            <progress className='image__progress' value={progress} max='100' />
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Enter a caption...' />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>

            <h1>Hello</h1>
            {/* <Modal open={openUpload} onClose={() => {}}>
                <Box sx={style}>
                    <center>
                        <img
                            className="app__headerImage"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                        />
                    </center>
                    <Button>hello</Button>
                </Box>
            </Modal> */}

<Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
          <progress className='image__progress' value={progress} max='100' />
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Enter a caption...' />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
          </Box>
        </Fade>
      </Modal>
        </div>
    )
}