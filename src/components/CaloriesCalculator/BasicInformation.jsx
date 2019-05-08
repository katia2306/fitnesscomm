import React from "react";
import {
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  Checkbox
} from "@material-ui/core";
import PropTypes from "prop-types";

const BasicInformation = ({
  gender,
  age,
  height,
  weight,
  imperial,
  onChange,
  onImperialChange
}) => {
  const heightMetric = imperial ? "ft" : "cm";
  const weightMetric = imperial ? "lb" : "kg";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup name="gender" value={gender} row onChange={onChange}>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item md>
        <TextField
          id="basic-info-age"
          label="Age"
          type="number"
          name="age"
          margin="dense"
          variant="outlined"
          fullWidth
          value={age}
          onChange={onChange}
        />
      </Grid>
      <Grid item md>
        <TextField
          id="basic-info-height"
          label="Height"
          type="number"
          name="height"
          margin="dense"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{heightMetric}</InputAdornment>
            )
          }}
          value={height}
          onChange={onChange}
        />
      </Grid>
      <Grid item md>
        <TextField
          id="basic-info-weight"
          label="Weight"
          type="number"
          name="weight"
          margin="dense"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{weightMetric}</InputAdornment>
            )
          }}
          value={weight}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="imperial"
              checked={imperial}
              onChange={onImperialChange}
            />
          }
          label="Use imperial system"
        />
      </Grid>
    </Grid>
  );
};

BasicInformation.propTypes = {
  gender: PropTypes.oneOf(["female", "male"]).isRequired,
  age: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  imperial: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onImperialChange: PropTypes.func.isRequired
};

export default BasicInformation;
