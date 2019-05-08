import React from "react";
import { Typography, TextField, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing.unit
  }
}));

const TrainingBox = ({ inputChange, handleAddExercise, handleClose }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">Add Cardio exercise</Typography>
      <Divider />

      <form noValidate onSubmit={handleAddExercise}>
        <TextField
          name="exercise"
          label="Exercise"
          variant="outlined"
          onChange={inputChange}
          className={classes.textField}
          fullWidth
        />

        <TextField
          name="series"
          label="Series"
          variant="outlined"
          onChange={inputChange}
          className={classes.textField}
          fullWidth
        />

        <TextField
          name="repetitions"
          label="Repetitions/Serie"
          variant="outlined"
          onChange={inputChange}
          className={classes.textField}
          fullWidth
        />

        <TextField
          name="weight"
          label="Weight/Series"
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

export default TrainingBox;
