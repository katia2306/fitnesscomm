import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  StepContent,
  Step,
  Stepper,
  StepLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import BasicInformation from "./BasicInformation";
import Activity from "./Activity";
import Goal from "./Goal";
import TotalCalories from "./TotalCalories";
import useFormData from "../../hooks/useFormData";
import {
  profilesActions,
  profilesSelectors
} from "../../store/profiles.reducer";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
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

const initialFormData = {
  gender: "female",
  age: "",
  height: "",
  weight: "",
  activity: "none",
  goal: "maintenance",
  imperial: false
};

const CaloriesCalculator = ({
  createProfile,
  createProfileError,
  createProfilesFormReset
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleCreateProfile = (dailyCalories, macros) => {
    setLoading(true);
    createProfile({ title: "Test Title", dailyCalories, ...macros });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(({ id, stepLabel, StepComponent }) => (
          <Step key={id}>
            <StepLabel>{stepLabel}</StepLabel>
            <StepContent>
              <StepComponent
                {...formData}
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
          onCreateProfile={handleCreateProfile}
          handleReset={handleReset}
          isLoading={loading}
          {...formData}
        />
      )}
    </div>
  );
};

CaloriesCalculator.defaultProps = {
  createProfileError: undefined
};

CaloriesCalculator.propTypes = {
  createProfile: PropTypes.func.isRequired,
  createProfileError: PropTypes.shape({
    code: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  createProfilesFormReset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  createProfileError: profilesSelectors.getCreateProfileError(state)
});

const mapDispatchToProps = {
  createProfile: profilesActions.createProfileRequest,
  createProfilesFormReset: profilesActions.createProfilesFormReset
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaloriesCalculator);
