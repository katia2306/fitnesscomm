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
    textTransform: "uppercase",
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
      width: theme.spacing.unit * 17,
      height: theme.spacing.unit * 17,
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
    whiteSpace: "nowrap",
    flexShrink: 0,
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
  },
  displayName: {
    textTransform: "uppercase",
    fontWeight: 300
  }
}));

const ProfileHeader = (props: Props) => {
  const { email, displayName, shortName } = props;
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap">
      <Grid item xs={4} lg={3} title="Change profile picture">
        <Avatar className={classes.avatar}>{shortName}</Avatar>
      </Grid>
      <Grid
        item
        xs={8}
        lg={9}
        component="section"
        className={classes.profileContainer}
      >
        <Grid container className={classes.profileInfo} wrap="nowrap">
          <Typography
            component="h1"
            variant="h5"
            inline
            noWrap
            className={classes.displayName}
          >
            {displayName}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            className={classes.editProfileButton}
          >
            Edit Profile
          </Button>
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
