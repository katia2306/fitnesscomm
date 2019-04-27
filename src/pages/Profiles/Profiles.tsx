import React from "react";
import { Route } from "react-router-dom";
import Helmet from "react-helmet";
import { CaloriesCalculator, PageWrapper } from "../../components";
import { appRoutes } from "../../routes/app.routes";
import ProfilesMainPage from "./ProfilesMainPage";

const Profiles = () => {
  return (
    <PageWrapper container component="section">
      <Helmet title="Profiles" />
      <Route exact path={appRoutes.PROFILES} component={ProfilesMainPage} />
      <Route
        exact
        path={appRoutes.PROFILES_NEW}
        component={CaloriesCalculator}
      />
    </PageWrapper>
  );
};

export default Profiles;
