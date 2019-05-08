import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
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

MacronutrientBox.defaultProps = {
  paperProps: {},
  textPrimaryProps: {},
  textSecondaryProps: {}
};

MacronutrientBox.propTypes = {
  macro: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paperProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  textPrimaryProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  textSecondaryProps: PropTypes.object
};

export default MacronutrientBox;
