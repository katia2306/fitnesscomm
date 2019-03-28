import React from "react";
import { Grid, Theme, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { ProfileHeader } from "../../components";
import ReduxModel from "../../store/redux.model";

interface Props {
  user: ReduxModel["user"];
}

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

const Profile = (props: Props) => {
  const { user } = props;
  const classes = useStyles();

  const { email, displayName, shortName } = user;

  return (
    <Grid container justify="center" className={classes.root} component="main">
      <Helmet title={displayName} />
      <Grid container item xs md={8} lg={6} direction="column">
        <Grid item className={classes.headerContainer}>
          <ProfileHeader
            email={email}
            displayName={displayName}
            shortName={shortName}
          />
        </Grid>
        <Divider />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
