import React, { useState } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppNavigation, AppDrawer } from "./components";
import { themeSelectors } from "./store/theme.reducer";
import { darkTheme, lightTheme } from "./themes";
import { userSelectors } from "./store/user.reducer";
import { setAPIUrl } from "./utils/api.utils";
import AppRoutes from "./routes/AppRoutes";

setAPIUrl();

const App = ({ isThemeDark, userLoaded }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = isThemeDark ? darkTheme : lightTheme;

  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        action={[
          <Button key={0} color="inherit" size="small">
            {"Dismiss"}
          </Button>
        ]}
      >
        <CssBaseline />
        <AppNavigation onDrawerOpen={handleDrawerOpen} />
        <AppDrawer drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} />
        <AppRoutes />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

App.propTypes = {
  isThemeDark: PropTypes.bool.isRequired,
  userLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isThemeDark: themeSelectors.getTheme(state),
  userLoaded: userSelectors.isUserLoaded(state)
});

export default connect(mapStateToProps)(App);
