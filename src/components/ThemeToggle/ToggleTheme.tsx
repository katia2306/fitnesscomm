import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { themeActions } from "../../store/theme.reducer";

interface Props {
  toggleTheme: typeof themeActions.toggleThemeRequest;
}

const ToggleTheme = (props: Props) => {
  const { toggleTheme } = props;

  return (
    <Button variant="contained" color="primary" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleThemeRequest
};

export default connect(
  undefined,
  mapDispatchToProps
)(ToggleTheme);
