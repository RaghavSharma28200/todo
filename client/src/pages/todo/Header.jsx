import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const style = {
    bgcolor: "#5cdb95",
    flexGrow: 1,
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={style}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Memo
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
