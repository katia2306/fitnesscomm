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
import {
  profilesSelectors,
  profilesActions
} from "../../store/profiles.reducer";
import { MacronutrientBox } from "..";

const useStyles = makeStyles({
  cardHeader: {
    paddingBottom: 0
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

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
    <Card>
      <CardHeader
        title={title}
        subheader={DateTime.fromJSDate(createdAt.toDate()).toLocaleString(
          DateTime.DATE_HUGE
        )}
        className={classes.cardHeader}
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
          >
            <Typography variant="body1">Calories</Typography>
            <Typography variant="body1" color="textSecondary">
              {dailyCalories}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions} disableActionSpacing>
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