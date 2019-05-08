import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { MacronutrientBox } from "..";
import PropTypes from "prop-types";
import {
  feetToCentimeters,
  poundsToKilograms
} from "../../utils/convert.utils";
import {
  calculateBMR,
  calculateDailyCalories,
  calculateMacros
} from "../../utils/macros.utils";

const useStyles = makeStyles(theme => ({
  actionsContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  resultContainer: {
    padding: theme.spacing(3),
    paddingTop: 0
  },
  macrosContainer: {
    marginTop: theme.spacing(1)
  }
}));

const TotalCalories = ({
  gender,
  age = 0,
  height: heightProp,
  weight: weightProp,
  activity,
  goal,
  imperial,
  handleReset,
  onCreateProfile,
  isLoading
}) => {
  const classes = useStyles();

  let height = 0;
  let weight = 0;

  if (imperial) {
    height = feetToCentimeters(heightProp);
    weight = poundsToKilograms(weightProp);
  }

  const bmr = calculateBMR(gender, weight, height, age);
  const dailyCalories = calculateDailyCalories(bmr, activity, goal);

  const macros = calculateMacros(weight, dailyCalories);
  const { protein, carbohydrate, fat, fiber } = macros;

  const handleCreateProfile = () => {
    onCreateProfile(dailyCalories, macros);
  };

  return (
    <Paper square elevation={0} className={classes.resultContainer}>
      <Grid container justify="center">
        <Grid item xs>
          <Typography align="center" variant="h5" component="h1" gutterBottom>
            We suggest you to consume
          </Typography>
          <Typography
            align="center"
            variant="h5"
            component="h2"
            color="textSecondary"
          >
            {dailyCalories}
          </Typography>
          <Typography
            align="center"
            variant="h5"
            component="h2"
            color="textSecondary"
            gutterBottom
          >
            Calories
          </Typography>
          <Typography align="center" variant="caption" component="h3">
            These numbers will help you start your nutritional plan
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        justify="center"
        className={classes.macrosContainer}
      >
        <Grid item xs>
          <MacronutrientBox macro="Protein" total={protein} />
        </Grid>
        <Grid item xs>
          <MacronutrientBox macro="Carbs" total={carbohydrate} />
        </Grid>
        <Grid item xs>
          <MacronutrientBox macro="Fat" total={fat} />
        </Grid>
        <Grid item xs>
          <MacronutrientBox macro="Fiber" total={fiber} />
        </Grid>
      </Grid>
      <Button
        onClick={handleReset}
        className={classes.button}
        disabled={isLoading}
      >
        Reset
      </Button>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        disabled={isLoading}
        onClick={handleCreateProfile}
      >
        Save
      </Button>
    </Paper>
  );
};

TotalCalories.propTypes = {
  gender: PropTypes.oneOf(["female", "male"]).isRequired,
  age: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  activity: PropTypes.oneOf(["none", "light", "moderate", "active", "intense"])
    .isRequired,
  goal: PropTypes.oneOf([
    "maintenance",
    "moderateLoss",
    "rapidLoss",
    "moderateGain",
    "rapidGain"
  ]).isRequired,
  imperial: PropTypes.bool.isRequired,
  onCreateProfile: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default TotalCalories;
