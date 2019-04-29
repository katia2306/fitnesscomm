import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing.unit
  }
}));

const MacronutrientBox = ({
  macro,
  total,
  paperProps,
  textPrimaryProps,
  textSecondaryProps
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...paperProps}>
      <Typography align="center" {...textPrimaryProps}>
        {macro}
      </Typography>
      <Typography align="center" color="textSecondary" {...textSecondaryProps}>
        {total} g
      </Typography>
    </Paper>
  );
};

export default MacronutrientBox;
