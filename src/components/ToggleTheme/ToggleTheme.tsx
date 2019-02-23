import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { actions as themeActions } from '../../store/reducers/theme.reducer';

const ToggleTheme = ({ toggleTheme }) => {
  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <Button variant='contained' color='primary' onClick={handleToggleTheme}>
      Toggle Theme
    </Button>
  );
};

ToggleTheme.propTypes = {
  toggleTheme: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  toggleTheme: themeActions.toggleTheme
};

export default connect(
  null,
  mapDispatchToProps
)(ToggleTheme);
