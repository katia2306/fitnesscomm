import React from "react";
import {
  Grid,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup
} from "@material-ui/core";
import PropTypes from "prop-types";

const Goal = ({ goal, onChange }) => {
  return (
    <Grid container spacing={8}>
      <Grid item>
        <FormControl component="fieldset">
          <RadioGroup name="goal" value={goal} onChange={onChange}>
            <FormControlLabel
              value="rapidLoss"
              control={<Radio />}
              label="Rapid weight loss"
            />
            <FormControlLabel
              value="moderateLoss"
              control={<Radio />}
              label="Moderate weight loss"
            />
            <FormControlLabel
              value="maintenance"
              control={<Radio />}
              label="Maintenance"
            />
            <FormControlLabel
              value="moderateGain"
              control={<Radio />}
              label="Moderate weight gain"
            />
            <FormControlLabel
              value="rapidGain"
              control={<Radio />}
              label="Rapid weight gain"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

Goal.propTypes = {
  goal: PropTypes.oneOf([
    "maintenance",
    "moderateLoss",
    "rapidLoss",
    "moderateGain",
    "rapidGain"
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Goal;
