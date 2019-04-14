import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, Paper, Typography, Button, Grid } from "@material-ui/core";
import {
  calculateBMR,
  calculateDailyCalories,
  calculateMacros
} from "../../utils/macros.utils";
import { MacronutrientBox } from "..";
import { CaloriesCalculatorProps, Macros } from "./CaloriesCalculator";
import {
  feetToCentimeters,
  poundsToKilograms
} from "../../utils/convert.utils";

interface Props extends CaloriesCalculatorProps {
  handleReset: () => void;
  onSubmit: (dailyCalories: number, macros: Macros) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  actionsContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  resultContainer: {
    padding: theme.spacing.unit * 3,
    paddingTop: 0
  },
  macrosContainer: {
    marginTop: theme.spacing.unit
  }
}));

const TotalCalories = (props: Props) => {
  const {
    gender,
    age = 0,
    activity,
    goal,
    imperial,
    handleReset,
    onSubmit
  } = props;
  let { height = 0, weight = 0 } = props;
  const classes = useStyles();

  if (imperial) {
    height = feetToCentimeters(height);
    weight = poundsToKilograms(weight);
  }

  const bmr = calculateBMR(gender, weight, height, age);
  const dailyCalories = calculateDailyCalories(bmr, activity, goal);

  const { protein, carbohydrate, fat, fiber } = calculateMacros(
    weight,
    dailyCalories
  );

  const handleSubmit = () => {
    onSubmit(dailyCalories, { protein, carbohydrate, fat, fiber });
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
        spacing={8}
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
      <Button onClick={handleReset} className={classes.button}>
        Reset
      </Button>
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        className={classes.button}
      >
        Save
      </Button>
    </Paper>
  );
};

export default TotalCalories;
