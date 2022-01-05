import React, { useState } from "react";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Backdrop, Button } from "@mui/material";

import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import axios from "axios";

const UpdateTodo = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");

  const style = {
    position: "absolute",
    top: "43%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const url = `https://todo-raghav.herokuapp.com/api/v1/tasks/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    };
    const data = {
      task: input,
    };

    await axios.patch(url, data, config);
    window.location.replace("/todo");
  };
  return (
    <>
      <SystemUpdateAltIcon onClick={handleOpen} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="txt-ctr model-ht">
              <input
                className="form__input mt"
                id="password"
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              <div>
                <Button
                  variant="contained"
                  sx={{ mt: "1rem" }}
                  fullWidth={true}
                  color="success"
                  onClick={handleUpdateClick}
                >
                  Update
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UpdateTodo;
