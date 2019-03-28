import React from "react";
import { Grid, Avatar, Typography, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReduxModel from "../../store/redux.model";

interface Props {
  email: ReduxModel["user"]["email"];
  displayName: ReduxModel["user"]["displayName"];
  shortName: ReduxModel["user"]["shortName"];
}

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type],
    cursor: "pointer",
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    fontSize: theme.spacing.unit * 4,
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 16,
      height: theme.spacing.unit * 16,
      fontSize: theme.spacing.unit * 8
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing.unit * 18,
      height: theme.spacing.unit * 18,
      fontSize: theme.spacing.unit * 9
    },
    [theme.breakpoints.up("xl")]: {
      width: theme.spacing.unit * 19,
      height: theme.spacing.unit * 19,
      fontSize: theme.spacing.unit * 10
    }
  },
  profileContainer: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit * 2
    }
  },
  profileInfo: {
    flexDirection: "column",
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  editProfileButton: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      marginLeft: theme.spacing.unit * 4
    }
  },
  emailProfileHeader: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));

const ProfileHeader = (props: Props) => {
  const { email, displayName, shortName } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={4} title="Change profile picture">
        <Avatar className={classes.avatar}>{shortName}</Avatar>
      </Grid>
      <Grid item xs component="section" className={classes.profileContainer}>
        <Grid container className={classes.profileInfo}>
          <Grid item>
            <Typography component="h1" variant="h5" inline>
              {displayName}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.editProfileButton}
              variant="outlined"
              fullWidth
              size="small"
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.emailProfileHeader}>
          <Typography component="h2" variant="body1">
            {email}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
