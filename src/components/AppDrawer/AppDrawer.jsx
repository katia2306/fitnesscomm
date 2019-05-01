import React from "react";
import {
  Drawer,
  ListItemText,
  List,
  ListItemIcon,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AssignmentInd } from "@material-ui/icons";
import { ListItemLink } from "..";
import PropTypes from "prop-types";
import { appRoutes , APP_DRAWER_WIDTH } from "../../utils/config.utils";


const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: APP_DRAWER_WIDTH,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: APP_DRAWER_WIDTH
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
  }
];

const AppDrawer = ({ drawerOpen, onDrawerClose }) => {
  const classes = useStyles();

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
      <Hidden smUp implementation="css">
        <Drawer
          open={drawerOpen}
          onClose={onDrawerClose}
          classes={{
            paper: classes.drawerPaper
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
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

AppDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired
};

export default AppDrawer;
