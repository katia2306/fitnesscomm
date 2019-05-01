import React, { useEffect } from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ButtonLink, ProfilesCard, PageWrapper } from "../../components";
import { appRoutes } from "../../utils/config.utils";
import {
  profilesActions,
  profilesSelectors
} from "../../store/profiles.reducer";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  }
}));

const ProfilesMainPage = ({ profiles, profilesLoaded, fetchProfiles }) => {
  const classes = useStyles();

  useEffect(() => {
    if (!profilesLoaded) {
      fetchProfiles();
    }
  }, [fetchProfiles, profilesLoaded]);

  let profilesList;
  if (profilesLoaded && profiles) {
    profilesList = (
      <Grid container wrap="wrap" spacing={8}>
        {profiles.map(id => (
          <Grid item xs={12} md={6} lg={4} key={id}>
            <ProfilesCard id={id} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <PageWrapper scroll>
      {profilesList}
      <ButtonLink
        to={appRoutes.PROFILES_NEW}
        fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <AddIcon />
      </ButtonLink>
    </PageWrapper>
  );
};

ProfilesMainPage.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  profilesLoaded: PropTypes.bool.isRequired,
  fetchProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profiles: profilesSelectors.getProfilesIds(state),
  profilesLoaded: profilesSelectors.getProfilesLoaded(state)
});

const mapDispatchToProps = {
  fetchProfiles: profilesActions.fetchProfilesRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilesMainPage);
