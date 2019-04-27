import React, { useEffect } from "react";
import { Add as AddIcon } from "@material-ui/icons";
import { Theme, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { ButtonLink, ProfilesCard, PageWrapper } from "../../components";
import { appRoutes } from "../../routes/app.routes";
import ReduxModel from "../../store/redux.model";
import {
  profilesActions,
  profilesSelectors,
  ProfilesData,
  Profiles
} from "../../store/profiles.reducer";

interface MainPageProps {
  profiles: ProfilesData["id"][];
  profilesLoaded: Profiles["loaded"];
  fetchProfiles: typeof profilesActions.fetchProfilesRequest;
}

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  }
}));

const ProfilesMainPage = (props: MainPageProps) => {
  const { profiles, profilesLoaded, fetchProfiles } = props;
  const classes = useStyles();

  useEffect(() => {
    if (!profilesLoaded) {
      fetchProfiles();
    }
  }, [fetchProfiles, profilesLoaded]);

  let profilesList;
  if (profilesLoaded && profiles) {
    profilesList = (
      <Grid container spacing={8}>
        {profiles.map(id => (
          <Grid item xs={12} sm={2} key={id}>
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

const mapStateToProps = (state: ReduxModel) => ({
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
