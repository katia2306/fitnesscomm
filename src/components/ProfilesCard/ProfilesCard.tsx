import React from "react";
import { connect } from "react-redux";
import { Card, Typography, CardContent, Theme, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ProfilesData, profilesSelectors } from "../../store/profiles.reducer";
import ReduxModel from "../../store/redux.model";
import { MacronutrientBox } from "..";

interface ProfilesCardProps {
  id: ProfilesData["id"];
  profile: ProfilesData;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing.unit
  },
  cardContent: {
    display: "flex"
  },
  macrosDetails: {
    display: "flex",
    alignItems: "flex-end",
    flex: 1
  },
  caloriesDetails: {
    display: "flex",
    marginLeft: theme.spacing.unit
  }
}));

const ProfilesCard = (props: ProfilesCardProps) => {
  const {
    profile: { protein, carbohydrate, fat, fiber, dailyCalories }
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.macrosDetails}>
          <Grid container spacing={8}>
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
          </Grid>
        </div>
        <div className={classes.caloriesDetails}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="h6">Calories</Typography>
            <Typography variant="h6" color="textSecondary">
              {dailyCalories}
            </Typography>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (
  state: ReduxModel,
  { id }: { id: ProfilesCardProps["id"] }
) => ({
  profile: profilesSelectors.getProfileById(state, id)
});

export default connect(mapStateToProps)(ProfilesCard);
