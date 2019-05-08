import React from "react";
import { Typography, TextField, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing.unit
  }
}));

const CardiovascularBox = ({ handleSubmit, handleClose, inputChange }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">Add Cardio exercise</Typography>
      <Divider />

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          name="exercise"
          label="Exercise"
          variant="outlined"
          className={classes.textField}
          onChange={inputChange}
          fullWidth
        />

        <TextField
          name="time"
          label="¿How much time?"
          variant="outlined"
          onChange={inputChange}
          className={classes.textField}
          fullWidth
        />

        <TextField
          name="calories"
          label="Burned calories"
          variant="outlined"
          onChange={inputChange}
          className={classes.textField}
          fullWidth
        />

        <Button variant="contained" color="primary" fullWidth type="submit">
          Submit
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </form>
    </div>
  );
};

CardiovascularBox.PropTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired
};

export default CardiovascularBox;
