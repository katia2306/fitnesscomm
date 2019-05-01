import React from "react";
import { Route } from "react-router-dom";
import Helmet from "react-helmet";
import { PageWrapper } from "../../components";
import { appRoutes } from "../../utils/config.utils";
import ProfilesMainPage from "./ProfilesMainPage";
import ProfilesNewPage from "./ProfilesNewPage";

const Profiles = () => {
  return (
    <PageWrapper container component="section">
      <Helmet title="Profiles" />
      <Route exact path={appRoutes.PROFILES} component={ProfilesMainPage} />
      <Route exact path={appRoutes.PROFILES_NEW} component={ProfilesNewPage} />
    </PageWrapper>
  );
};

export default Profiles;
