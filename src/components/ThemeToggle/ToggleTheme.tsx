import React from "react";
import { connect } from "react-redux";
import { Brightness4, Brightness4Outlined } from "@material-ui/icons";
// eslint-disable-next-line no-restricted-imports
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import ReduxModel from "../../store/redux.model";
import { themeSelectors, themeActions } from "../../store/theme.reducer";

interface Props extends IconButtonProps {
  isThemeDark: ReduxModel["theme"]["isThemeDark"];
  toggleTheme: typeof themeActions.toggleThemeRequest;
}

const ToggleTheme = (props: Props) => {
  const { isThemeDark, toggleTheme, ...other } = props;

  const handleThemeClick = () => {
    toggleTheme({ isThemeDark: !isThemeDark });
  };

  return (
    <IconButton onClick={handleThemeClick} {...other}>
      {isThemeDark ? <Brightness4 /> : <Brightness4Outlined />}
    </IconButton>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  isThemeDark: themeSelectors.getTheme(state)
});

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleThemeRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleTheme);
