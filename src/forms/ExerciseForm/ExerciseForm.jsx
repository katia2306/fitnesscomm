import React, { useState } from "react";
import {
  Typography,
  TextField,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { ButtonLink, CardiovascularBox, TrainingBox } from "../../components";
import useFormData from "../../hooks/useFormData";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary[theme.palette.type],
    color: "#ffff"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  form: {
    padding: "1%",
    overflowY: "scroll"
  },
  exerciseDate: {
    display: "inline-flex",
    padding: 10
  },
  datePicker: {
    paddingTop: "5%",
    marginRight: 10
  },
  segments: {
    padding: "1%"
  },
  links: {
    paddingBottom: 10
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  textField: {
    marginBottom: theme.spacing.unit
  }
}));

const initialFormData = {
  exercise: "",
  time: 0,
  calories: 0
};

const initialFormDataTraining = {
  exercise: "",
  series: 0,
  repetitions: 0,
  weight: 0
};

const ExerciseForm = () => {
  const classes = useStyles();
  const {
    formData: dataCardiovascular,
    formDataActions: { handleInputChange: cardiovascularInputChange }
  } = useFormData(initialFormData);
  const {
    formData: dataTraining,
    formDataActions: { handleInputChange: trainingInputChange }
  } = useFormData(initialFormDataTraining);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardiovascular, setCardiovascular] = useState([]);
  const [burnedCalories, setBurnedCalories] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [training, setTraining] = useState([]);
  const [formActive, setFormActive] = useState([]);

  const handleModalOpen = formData => {
    setFormActive(formData);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAddExercise = () => {
    const hola = dataCardiovascular;
    setCardiovascular([...cardiovascular, { dataCardiovascular }]);
    setBurnedCalories(burnedCalories + parseInt(dataCardiovascular.calories));
    setTotalMinutes(totalMinutes + parseInt(dataCardiovascular.time));
    handleClose();
  };

  const handleAddTraining = () => {
    setTraining([...training, { dataTraining }]);
    handleClose();
  };

  return (
    <div className={classes.form}>
      <form noValidate>
        <div className={classes.exerciseDate}>
          <Typography variant="body1" className={classes.datePicker}>
            Tu registro de ejercicios para
          </Typography>
          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <Divider />

        <div className={classes.segments}>
          <Typography variant="h5">Cardiovascular</Typography>
          <Typography className={classes.links}>
            <ButtonLink
              button
              onClick={() => handleModalOpen("cardiovascular")}
            >
              Add
            </ButtonLink>
            |<ButtonLink button>Quick tools</ButtonLink>
          </Typography>

          <Table>
            <TableHead>
              <TableRow className={classes.row}>
                <CustomTableCell>Exercise</CustomTableCell>
                <CustomTableCell>Minutes</CustomTableCell>
                <CustomTableCell>Burned calories</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardiovascular.map(cardio => {
                return (
                  <TableRow className={classes.row}>
                    <CustomTableCell>
                      {cardio.dataCardiovascular.exercise}
                    </CustomTableCell>
                    <CustomTableCell>
                      {cardio.dataCardiovascular.time} minutes
                    </CustomTableCell>
                    <CustomTableCell>
                      {cardio.dataCardiovascular.calories}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Table>
            <TableBody>
              <TableRow>
                <CustomTableCell>Diary total / Goal</CustomTableCell>
                <CustomTableCell>{totalMinutes}/70</CustomTableCell>
                <CustomTableCell>{burnedCalories}/503</CustomTableCell>
              </TableRow>
              <TableRow>
                <CustomTableCell>Week total / Goal</CustomTableCell>
                <CustomTableCell>0/280</CustomTableCell>
                <CustomTableCell>0/2.010</CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Divider />
        <div className={classes.segments}>
          <Typography variant="h5">Training</Typography>
          <Typography className={classes.links}>
            <ButtonLink button onClick={() => handleModalOpen("training")}>
              Add
            </ButtonLink>
            |<ButtonLink button>Quick tools</ButtonLink>
          </Typography>

          <Table>
            <TableHead>
              <TableRow className={classes.row}>
                <CustomTableCell>Exercise</CustomTableCell>
                <CustomTableCell>Series</CustomTableCell>
                <CustomTableCell>Repetitions / Series</CustomTableCell>
                <CustomTableCell>Weight / series</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {training.map(item => {
                return (
                  <TableRow className={classes.row}>
                    <CustomTableCell>
                      {item.dataTraining.exercise}
                    </CustomTableCell>
                    <CustomTableCell>
                      {item.dataTraining.series} minutes
                    </CustomTableCell>
                    <CustomTableCell>
                      {item.dataTraining.repetitions}
                    </CustomTableCell>
                    <CustomTableCell>
                      {item.dataTraining.weight}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div>
          <TextField
            id="notes"
            label="Notes about the exercise of the day"
            multiline
            rows="2"
            variant="outlined"
            className={classes.textField}
            fullWidth
          />
        </div>
        <Button variant="contained" color="primary">
          Ver informe Completo (Para imprimir)
        </Button>
      </form>

      <div>
        <Modal open={modalOpen} onClose={handleClose}>
          <div className={classes.paper}>
            {formActive === "cardiovascular" ? (
              <CardiovascularBox
                handleAddExercise={handleAddExercise}
                handleClose={handleClose}
                inputChange={cardiovascularInputChange}
              />
            ) : (
              <TrainingBox
                handleAddExercise={handleAddTraining}
                handleClose={handleClose}
                inputChange={trainingInputChange}
              />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ExerciseForm;
