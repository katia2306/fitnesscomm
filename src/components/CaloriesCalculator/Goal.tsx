import React from "react";
import {
  Grid,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup
} from "@material-ui/core";
import { CaloriesCalculatorProps } from "./CaloriesCalculator";

interface Props {
  formData: {
    goal: CaloriesCalculatorProps["goal"];
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Activity = (props: Props) => {
  const {
    formData: { goal },
    onChange
  } = props;

  return (
    <Grid container spacing={8}>
      <Grid item>
        <FormControl component={"fieldset" as "div"}>
          <RadioGroup
            name="goal"
            value={goal}
            onChange={onChange as (e: React.ChangeEvent<{}>) => void}
          >
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

export default Activity;
