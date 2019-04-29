import React from "react";
import { connect } from "react-redux";
import { Brightness4, Brightness4Outlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { themeSelectors, themeActions } from "../../store/theme.reducer";

const ToggleTheme = ({ isThemeDark, toggleTheme, ...other }) => {
  const handleThemeClick = () => {
    toggleTheme({ isThemeDark: !isThemeDark });
  };

  return (
    <IconButton
      onClick={handleThemeClick}
      {...other}
      title="Toggle light/dark theme"
    >
      {isThemeDark ? <Brightness4 /> : <Brightness4Outlined />}
    </IconButton>
  );
};

const mapStateToProps = state => ({
  isThemeDark: themeSelectors.getTheme(state)
});

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleThemeRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleTheme);
