import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Button,
  StepContent,
  Step,
  Stepper,
  StepLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import { withSnackbar, withSnackbarProps } from "notistack";
import BasicInformation from "./BasicInformation";
import Activity from "./Activity";
import Goal from "./Goal";
import TotalCalories from "./TotalCalories";
import useFormData from "../../hooks/useFormData";
import {
  profilesActions,
  profilesSelectors
} from "../../store/profiles.reducer";
import ReduxModel from "../../store/redux.model";
import {
  feetToCentimeters,
  poundsToKilograms
} from "../../utils/convert.utils";
import {
  calculateBMR,
  calculateDailyCalories,
  calculateMacros
} from "../../utils/macros.utils";

interface Props {
  createProfile: typeof profilesActions.createProfileRequest;
  createProfileError: ReduxModel["profiles"]["createProfileError"];
  createProfilesFormReset: typeof profilesActions.createProfilesFormReset;
}

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
  root: {
    flex: 1,
    overflowY: "auto"
  },
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

const CaloriesCalculator = (props: Props & withSnackbarProps) => {
  const {
    createProfile,
    createProfileError,
    enqueueSnackbar,
    createProfilesFormReset
  } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (createProfileError) {
      enqueueSnackbar(createProfileError.message, { variant: "error" });
    }
    setLoading(false);
  }, [enqueueSnackbar, createProfileError]);

  useEffect(() => {
    return () => {
      createProfilesFormReset();
    };
  }, [createProfilesFormReset]);

  const { gender, age = 0, activity, goal, imperial } = formData;
  let { weight = 0, height = 0 } = formData;

  if (imperial) {
    height = feetToCentimeters(height);
    weight = poundsToKilograms(weight);
  }

  const bmr = calculateBMR(gender, weight, height, age);
  const dailyCalories = calculateDailyCalories(bmr, activity, goal);

  const macros = calculateMacros(weight, dailyCalories);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    createProfile({ dailyCalories, ...macros });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} noValidate>
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
          <TotalCalories
            macros={macros}
            dailyCalories={dailyCalories}
            handleReset={handleReset}
            isLoading={loading}
          />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state: ReduxModel) => ({
  createProfileError: profilesSelectors.getCreateProfileError(state)
});

const mapDispatchToProps = {
  createProfile: profilesActions.createProfileRequest,
  createProfilesFormReset: profilesActions.createProfilesFormReset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(CaloriesCalculator));
