import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Button,
  StepContent,
  Step,
  Stepper,
  StepLabel
} from "@material-ui/core";
import BasicInformation from "./BasicInformation";
import Activity from "./Activity";
import Goal from "./Goal";
import TotalCalories from "./TotalCalories";
import useFormData from "../../hooks/useFormData";

export interface CaloriesCalculatorProps {
  gender: "female" | "male";
  age: number | undefined;
  height: number | undefined;
  weight: number | undefined;
  activity: "none" | "light" | "moderate" | "active" | "intense";
  goal:
    | "maintenance"
    | "moderateLoss"
    | "rapidLoss"
    | "moderateGain"
    | "rapidGain";
  imperial: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  actionsContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
}));

const steps = [
  { id: 0, stepLabel: "Basic Information", StepComponent: BasicInformation },
  { id: 1, stepLabel: "Activity", StepComponent: Activity },
  { id: 2, stepLabel: "Goal", StepComponent: Goal }
];

const initialFormData: CaloriesCalculatorProps = {
  gender: "female",
  age: undefined,
  height: undefined,
  weight: undefined,
  activity: "none",
  goal: "maintenance",
  imperial: false
};

const CaloriesCalculator = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const {
    formData,
    formDataActions: { handleInputChange, handleCheckboxChange }
  } = useFormData(initialFormData);

  function handleNextStep() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBackStep() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(({ id, stepLabel, StepComponent }) => (
          <Step key={id}>
            <StepLabel>{stepLabel}</StepLabel>
            <StepContent>
              <StepComponent
                formData={formData}
                onChange={handleInputChange}
                onImperialChange={handleCheckboxChange}
              />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBackStep}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextStep}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <TotalCalories {...formData} handleReset={handleReset} />
      )}
    </div>
  );
};

export default CaloriesCalculator;
