import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  let name, value;

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignup({ ...signup, [name]: value });
  };
  const handleSignupClick = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, passwordConfirm } = signup;
      const res = await axios({
        method: "POST",
        url: "https://todo-raghav.herokuapp.com/api/v1/users/signup",
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });
      if (res.data.status === "success") {
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        navigate("/todo");
      }
    } catch (error) {
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
          <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
          <form className="form form--signup">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Your name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                name="name"
                value={signup.name}
                onChange={handleSignupChange}
                placeholder=""
                required=""
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                name="email"
                value={signup.email}
                onChange={handleSignupChange}
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
                value={signup.password}
                onChange={handleSignupChange}
                placeholder="••••••••"
                required=""
                minLength="8"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="passwordConfirm">
                Confirm password
              </label>
              <input
                className="form__input"
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={signup.passwordConfirm}
                onChange={handleSignupChange}
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
                onClick={handleSignupClick}
              >
                SignUp
              </Button>
            </div>
          </form>
          <div className="txt-ctr">
            <div className="pd"> Or </div>
            <div className="pd">
              <NavLink to="/">Already have an Account ? </NavLink>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Signup;
