import React from "react";
import { Paper, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { PaperProps } from "@material-ui/core/Paper";
import { TypographyProps } from "@material-ui/core/Typography";

interface Props {
  macro: string;
  total: number;
  paperProps?: PaperProps;
  typographyProps?: TypographyProps;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing.unit
  }
}));

const MacronutrientBox = (props: Props) => {
  const { macro, total, paperProps, typographyProps } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...paperProps}>
      <Typography align="center" {...typographyProps}>
        {macro}
      </Typography>
      <Typography align="center" {...typographyProps}>
        {Math.round(total)} g
      </Typography>
    </Paper>
  );
};

export default MacronutrientBox;
