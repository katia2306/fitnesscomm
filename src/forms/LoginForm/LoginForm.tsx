import { TextField } from "@material-ui/core";
import React from "react";

const LoginForm = () => {
  return (
    <form>
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        fullWidth
      />

      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

export default LoginForm;
