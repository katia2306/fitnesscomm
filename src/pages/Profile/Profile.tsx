import React from "react";
import { Grid, Theme, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { ProfileHeader } from "../../components";
import ReduxModel from "../../store/redux.model";
import { userSelectors } from "../../store/user.reducer";

interface Props {
  user: ReduxModel["user"];
}

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 4
    }
  }
}));

const Profile = (props: Props) => {
  const { user } = props;
  const classes = useStyles();

  const { email, displayName, shortName } = user;

  return (
    <Grid container item xs md={8} lg={6} direction="column">
      <Helmet title={displayName} />
      <Grid item xs className={classes.headerContainer}>
        <ProfileHeader
          email={email}
          displayName={displayName}
          shortName={shortName}
        />
      </Grid>
      <Divider />
    </Grid>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(Profile);
