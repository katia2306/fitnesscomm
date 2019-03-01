import { Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  button: {
    marginTop: "20px"
  },
  form: {
    alignItems: "center"
  }
});

const SignupForm = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.form}>
      <TextField label="Username" type="text" name="username" required />
      <TextField label="Email" type="email" name="email" required />
      <TextField label="Password" type="password" name="password" required />
      <TextField
        label="Repeat password"
        type="password"
        name="repeat-password"
        required
      />

      <Button variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </FormControl>
  );
};

export default SignupForm;
