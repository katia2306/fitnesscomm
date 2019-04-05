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
    activity: CaloriesCalculatorProps["activity"];
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Activity = (props: Props) => {
  const {
    formData: { activity },
    onChange
  } = props;

  return (
    <Grid container spacing={8}>
      <Grid item>
        <FormControl component={"fieldset" as "div"}>
          <RadioGroup
            name="activity"
            value={activity}
            onChange={onChange as (e: React.ChangeEvent<{}>) => void}
          >
            <FormControlLabel
              value="none"
              control={<Radio />}
              label="Sedentary or very light activity"
            />
            <FormControlLabel
              value="light"
              control={<Radio />}
              label="1-3 times/week of activity"
            />
            <FormControlLabel
              value="moderate"
              control={<Radio />}
              label="4-5 times/week of activity"
            />
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="6-7 times/week of activity"
            />
            <FormControlLabel
              value="intense"
              control={<Radio />}
              label="Very intense activity"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Activity;
