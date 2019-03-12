import { IconButton } from "@material-ui/core";
import { Brightness2, Brightness2Outlined } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import IReduxModel from "../../store/redux.model";
import { getTheme, themeActions } from "../../store/theme.reducer";

interface Props {
  isThemeDark: IReduxModel["theme"]["isThemeDark"];
  toggleTheme: typeof themeActions.toggleThemeRequest;
}

const ToggleTheme = (props: Props) => {
  const { isThemeDark, toggleTheme } = props;

  const handleThemeClick = () => {
    toggleTheme({ isThemeDark: !isThemeDark });
  };

  return (
    <IconButton onClick={handleThemeClick}>
      {isThemeDark ? <Brightness2 /> : <Brightness2Outlined />}
    </IconButton>
  );
};

const mapStateToProps = (state: IReduxModel) => ({
  isThemeDark: getTheme(state)
});

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleThemeRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleTheme);
