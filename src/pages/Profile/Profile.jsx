import React from "react";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProfileHeader } from "../../components";
import { userSelectors } from "../../store/user.reducer";

const useStyles = makeStyles(theme => ({
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

const Profile = ({ user: { email, displayName, shortName } }) => {
  const classes = useStyles();

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

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

export default connect(mapStateToProps)(Profile);
