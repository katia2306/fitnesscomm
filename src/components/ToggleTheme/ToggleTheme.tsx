import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { actions as themeActions } from '../../store/reducers/theme.reducer';

interface IProps {
  toggleTheme: typeof themeActions.toggleTheme;
}

const ToggleTheme = (props: IProps) => {
  const { toggleTheme } = props;

  return (
    <Button variant="contained" color="primary" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleTheme
};

export default connect(
  null,
  mapDispatchToProps
)(ToggleTheme);
