import React from "react";
import { connect } from "react-redux";
import { Brightness4, Brightness4Outlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
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

ToggleTheme.propTypes = {
  isThemeDark: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired
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
