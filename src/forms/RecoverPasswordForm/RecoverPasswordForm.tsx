import React from "react";
import { Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    marginTop: "20px"
  },
  form: {
    alignItems: "center"
  },
  span: {
    color: "#ffffff"
  }
});

const RecoverPasswordForm = () => {
  const classes = useStyles();
  return (
    <div>
      <span className={classes.span}>Help with password</span>

      <FormControl className={classes.form}>
        <TextField label="Email" type="text" name="email" required />
        <Button variant="contained" color="primary" className={classes.button}>
          Continue
        </Button>
      </FormControl>
    </div>
  );
};

export default RecoverPasswordForm;
