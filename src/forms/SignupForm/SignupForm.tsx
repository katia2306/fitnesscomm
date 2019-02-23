import { Button, FormControl, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  form: {
    alignItems: 'center'
  },
  button: {
    marginTop: '20px'
  }
});

const SignupForm = ({ classes }) => {
  return (
    <div>
      <FormControl className={classes.form}>
        <div>
          <TextField
            label="Username"
            type="text"
            name="username"
            required={true}
          />
        </div>
        <div>
          <TextField label="Email" type="email" name="email" required={true} />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            required={true}
          />
        </div>
        <div>
          <TextField
            label="Repeat password"
            type="password"
            name="repeat-password"
            required={true}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

SignupForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupForm);
