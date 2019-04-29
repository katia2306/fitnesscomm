import React from "react";
import { Drawer, ListItemText, List, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AssignmentInd } from "@material-ui/icons";
import { ListItemLink } from "..";
import PropTypes from "prop-types";
import { appRoutes } from "../../routes/app.routes";

const useStyles = makeStyles({
  list: {
    width: 280,
    maxWidth: 280
  }
});

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

  return (
    <Drawer open={drawerOpen} onClose={onDrawerClose}>
      <div
        tabIndex={0}
        role="button"
        onClick={onDrawerClose}
        onKeyDown={onDrawerClose}
        className={classes.list}
      >
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
      </div>
    </Drawer>
  );
};

AppDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired
};

export default AppDrawer;
