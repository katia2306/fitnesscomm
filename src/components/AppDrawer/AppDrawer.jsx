import React from "react";
import { Drawer, ListItemText, List, ListItemIcon } from "@material-ui/core";
import { AssignmentInd, FitnessCenter } from "@material-ui/icons";
import { ListItemLink } from "..";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import { appRoutes } from "../../utils/config.utils";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.appDrawer.width,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: theme.appDrawer.width
  },
  list: {
    width: "100%"
  },
  toolbar: theme.mixins.toolbar
}));

const drawerList = [
  {
    id: 0,
    text: "Profiles",
    to: appRoutes.PROFILES,
    Icon: AssignmentInd
  },
  {
    id: 1,
    text: "Exercise",
    to: appRoutes.EXERCISE,
    Icon: FitnessCenter
  }
];

const AppDrawer = ({ drawerOpen, onDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMediaQuery = useMediaQuery(theme.breakpoints.down("xs"));

  const drawer = (
    <List>
      {drawerList.map(({ id, text, to, Icon }) => (
        <ListItemLink key={id} to={to}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemLink>
      ))}
    </List>
  );

  return (
    <nav className={classes.drawer}>
      {matchesMediaQuery ? (
        <Drawer
          open={drawerOpen}
          onClose={onDrawerClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={onDrawerClose}
            onKeyDown={onDrawerClose}
            className={classes.list}
          >
            {drawer}
          </div>
        </Drawer>
      ) : (
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        )}
    </nav>
  );
};

AppDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired
};

export default AppDrawer;
