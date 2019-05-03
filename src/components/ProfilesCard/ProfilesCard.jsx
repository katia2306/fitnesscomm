import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  CardActions,
  Button,
  CardHeader
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import {
  profilesSelectors,
  profilesActions
} from "../../store/profiles.reducer";
import { MacronutrientBox } from "..";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    minWidth: 320
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  dailyCalories: {
    marginTop: theme.spacing(1),
    fontWeight: 300
  }
}));

const ProfilesCard = ({
  profile: {
    id,
    title,
    protein,
    carbohydrate,
    fat,
    fiber,
    dailyCalories,
    createdAt
  },
  deleteProfile
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const handleDeleteProfile = () => {
    setLoading(true);
    deleteProfile(id);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={DateTime.fromJSDate(createdAt.toDate()).toLocaleString(
          DateTime.DATE_HUGE
        )}
      />
      <CardContent>
        <Grid container>
          <Grid item xs>
            <MacronutrientBox
              paperProps={{ elevation: 0 }}
              macro="Protein"
              total={protein}
            />
          </Grid>
          <Grid item xs>
            <MacronutrientBox
              paperProps={{ elevation: 0 }}
              macro="Carbs"
              total={carbohydrate}
            />
          </Grid>
          <Grid item xs>
            <MacronutrientBox
              paperProps={{ elevation: 0 }}
              macro="Fat"
              total={fat}
            />
          </Grid>
          <Grid item xs>
            <MacronutrientBox
              paperProps={{ elevation: 0 }}
              macro="Fiber"
              total={fiber}
            />
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.dailyCalories}
          >
            <Typography variant="h5">Daily Calories</Typography>
            <Typography variant="h5" color="textSecondary">
              {dailyCalories}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <Button
          size="small"
          color="secondary"
          disabled={loading}
          onClick={handleDeleteProfile}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

ProfilesCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dailyCalories: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    carbohydrate: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    fiber: PropTypes.number.isRequired,
    createdAt: PropTypes.object.isRequired
  }).isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state, { id }) => ({
  profile: profilesSelectors.getProfileById(state, id)
});

const mapDispatchToProps = {
  deleteProfile: profilesActions.deleteProfileRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilesCard);
