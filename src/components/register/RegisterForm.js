import React from "react";
import { useForm } from "../../application";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../shared";
import { authenticateUser } from "../../redux";
import { Box, Button, styled, FormControl } from "@mui/material";

const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "name should have at leats 3 character",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3
          ? null
          : "lastname should have at leats 1 character",
    },
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
        password.length > 6 ? null : "email is not valid",
    },
  };
};
export const RegisterForm = () => {
  const { formValues, onInputChange } = useForm({
    defaultFotmValues: generateRegisterFormValues(),
  });
  console.log("formValues", formValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    dispatch(
      authenticateUser({
        formValues: { firstName, lastName, email, password },
        isLogin: false,
      })
    )
      .unwrap()
      .then(() => navigate("/"));
    console.log("firstName",firstName,"lastName", lastName, "email", email, "password", password); console.log("dispatch", dispatch);
  };
  return (
    <FormControl fullWidth>
      <Box className="formBox">
        <TextFieldComponent
          name="firstName"
          label="firstName"
          value={formValues.firstName.value}
          onChange={onInputChange}
          error={!!formValues.firstName.error}
          helperText={formValues.firstName.error}
        />
        <TextFieldComponent
          name="lastName"
          label="lastName"
          value={formValues.lastName.value}
          onChange={onInputChange}
          error={!!formValues.lastName.error}
          helperText={formValues.lastName.error}
        />
        <TextFieldComponent
          name="email"
          label="email"
          value={formValues.email.value}
          onChange={onInputChange}
          error={!!formValues.email.error}
          helperText={formValues.email.error}
        />
        <TextFieldComponent
          name="password"
          label="password"
          value={formValues.password.value}
          onChange={onInputChange}
          error={!!formValues.password.error}
          helperText={formValues.password.error}
        />
        <Button onClick={onRegister} className="styleformButton">
          REGISTER
        </Button>
      </Box>
    </FormControl>
  );
};
