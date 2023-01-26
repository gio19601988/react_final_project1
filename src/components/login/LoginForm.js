import React from "react";
import { FormControl, Box, Button } from "@mui/material";
import { useForm } from "../../application";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../shared";
import { authenticateUser } from "../../redux";

const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@") ? null : "email is not valid",
    },

    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6 ? null : "არავალიდური პაროლი",
    },
  };
};
export const LoginForm = () => {
  const { formValues: loginFormValues, onInputChange } = useForm({
    defaultFotmValues: generateLoginFormValues(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = (e) => {
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    dispatch(
      authenticateUser({
        formValues: { email, password },
        isLogin: true,
      })
    )
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <FormControl fullWidth>
      <Box className="formBox">
        <TextFieldComponent
          name="email"
          label="email"
          value={loginFormValues.email.value}
          onChange={onInputChange}
          error={loginFormValues.email.error}
          // helperText={loginFormValues.email.error}
        />
        <TextFieldComponent
          name="password"
          label="password"
          value={loginFormValues.password.value}
          onChange={onInputChange}
          error={loginFormValues.password.error}
          // helperText={loginFormValues.password.error}
        />
        <Button className="styleformbutton" onClick={onLogin}>
          Login
        </Button>
      </Box>
    </FormControl>
  );
};
