import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { LoginForm } from "../../forms";

const useStyles = makeStyles((theme: Theme) => {
  console.log(theme);
  return {
    root: {
      maxWidth: "768px"
    },
    formContainer: {
      width: "70%",
      marginLeft: "auto",
      paddingLeft: 8
    }
  };
});

const Authentication = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        className={classes.formContainer}
      >
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
