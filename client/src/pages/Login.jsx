import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    // console.log(name, value);
    setLogin({ ...login, [name]: value });
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = login;
      const res = await axios({
        method: "POST",
        url: "https://todo-raghav.herokuapp.com/api/v1/users/login",
        data: {
          email,
          password,
        },
      });

      if (res.data.status === "success") {
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        navigate("/todo");
      }
    } catch (error) {
      // console.log(error)
      alert(error.response.data.message);
    }
  };
  const style = {
    bgcolor: "#edf5e1",
  };
  return (
    <div className="flex">
      <Box sx={style}>
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form form--login">
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                name="email"
                value={login.email}
                onChange={handleLoginChange}
                placeholder="you@example.com"
                required=""
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                name="password"
                value={login.password}
                onChange={handleLoginChange}
                placeholder="••••••••"
                required=""
                minLength="8"
              />
            </div>
            <div className="form__group">
              <Button
                variant="contained"
                sx={{ mt: "1rem" }}
                fullWidth={true}
                color="success"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </div>
          </form>
          <div className="txt-ctr">
            <div className="pd"> Or </div>
            <div className="pd">
              <NavLink to="/signup">Create new Account</NavLink>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
