import React from "react";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ProfileHeader } from "../../components";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing.unit * 6,
      paddingBottom: theme.spacing.unit * 6
    }
  },
  headerContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 6
    }
  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root} component="main">
      <Grid item xs md={6} className={classes.headerContainer}>
        <ProfileHeader />
      </Grid>
    </Grid>
  );
};

export default Profile;
