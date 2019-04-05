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
import { CaloriesCalculatorProps } from "./CaloriesCalculator";

interface Props {
  formData: {
    gender: CaloriesCalculatorProps["gender"];
    age: CaloriesCalculatorProps["age"];
    height: CaloriesCalculatorProps["height"];
    weight: CaloriesCalculatorProps["weight"];
    imperial: CaloriesCalculatorProps["imperial"];
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImperialChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInformation = (props: Props) => {
  const {
    formData: { gender, age = "", height = "", weight = "", imperial },
    onChange,
    onImperialChange
  } = props;

  const heightMetric = imperial ? "ft" : "cm";
  const weightMetric = imperial ? "lb" : "kg";

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <FormControl component={"fieldset" as "div"}>
          <RadioGroup
            name="gender"
            value={gender}
            row
            onChange={onChange as (e: React.ChangeEvent<{}>) => void}
          >
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

export default BasicInformation;
