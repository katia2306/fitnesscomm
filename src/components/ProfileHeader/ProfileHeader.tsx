import React from "react";
import { Grid, Avatar, Typography, Button, Theme } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import ReduxModel from "../../store/redux.model";

interface Props {
  user: ReduxModel["user"];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      "& $emailProfileHeader": {
        display: "none"
      }
    },
    [theme.breakpoints.down("sm")]: {
      "& $profileContainer": {
        marginLeft: theme.spacing.unit * 2
      }
    },
    [theme.breakpoints.up("sm")]: {
      "& $profileInfo": {
        flexDirection: "row"
      },
      "& $editProfileButton": {
        marginTop: 0,
        marginLeft: theme.spacing.unit * 4
      }
    },
    [theme.breakpoints.up("lg")]: {
      "& $avatar": {
        width: theme.spacing.unit * 12,
        height: theme.spacing.unit * 12,
        fontSize: theme.spacing.unit * 6
      }
    },
    [theme.breakpoints.up("xl")]: {
      "& $avatar": {
        width: theme.spacing.unit * 19,
        height: theme.spacing.unit * 19,
        fontSize: theme.spacing.unit * 10
      }
    }
  },
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type],
    cursor: "pointer",
    width: theme.spacing.unit * 9,
    height: theme.spacing.unit * 9,
    fontSize: theme.spacing.unit * 4,
    fontWeight: 300
  },
  profileContainer: {},
  profileInfo: {
    flexDirection: "column",
    marginBottom: theme.spacing.unit
  },
  editProfileButton: {
    marginTop: theme.spacing.unit
  },
  emailProfileHeader: {}
}));

const ProfileHeader = (props: Props) => {
  const { user } = props;
  const classes = useStyles();

  const { email, displayName, shortName } = user;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} title="Change profile picture">
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

const mapStateToProps = (state: ReduxModel) => ({
  user: state.user
});

export default connect(mapStateToProps)(ProfileHeader);
