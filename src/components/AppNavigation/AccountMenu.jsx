import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  MenuItem,
  Menu,
  ListItemAvatar,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import { AccountBox, ExitToApp } from "@material-ui/icons";
import { userActions, userSelectors } from "../../store/user.reducer";
import { MenuItemLink } from "..";
import { appRoutes } from "../../routes/app.routes";

const useStyles = makeStyles(theme => ({
  avatar: {
    textTransform: "uppercase",
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type],
    marginLeft: theme.spacing.unit * 2,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },
  accountMenu: {
    maxWidth: 300,
    width: 300,
    paddingTop: 0
  },
  accountMenuHeader: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    "&, &:hover, &:focus": {
      backgroundColor: `${theme.palette.action.hover} !important`
    }
  },
  menuAvatar: {
    textTransform: "uppercase",
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type]
  }
}));

const AccountMenu = ({ user, userLogout }) => {
  const classes = useStyles();

  const { email, displayName, shortName } = user;

  const [avatarEl, setAvatarEl] = useState(undefined);
  const accountMenuOpen = !!avatarEl;

  const handleAccountMenuOpen = e => {
    setAvatarEl(e.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAvatarEl(undefined);
  };

  const handleLogoutClick = () => {
    handleAccountMenuClose();
    userLogout();
  };

  return (
    <Fragment>
      <Avatar className={classes.avatar} onClick={handleAccountMenuOpen}>
        {shortName}
      </Avatar>
      <Menu
        anchorEl={avatarEl}
        open={accountMenuOpen}
        onClose={handleAccountMenuClose}
        MenuListProps={{ className: classes.accountMenu }}
        PaperProps={{ component: "nav" }}
        disableAutoFocusItem
      >
        <MenuItemLink
          to={appRoutes.USER_PROFILE}
          onClick={handleAccountMenuClose}
          className={classes.accountMenuHeader}
          selected
        >
          <ListItemAvatar>
            <Avatar className={classes.menuAvatar}>{shortName}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={displayName}
            primaryTypographyProps={{ noWrap: true }}
            secondary={email}
            secondaryTypographyProps={{ noWrap: true }}
          />
        </MenuItemLink>
        <MenuItemLink
          to={appRoutes.USER_PROFILE}
          onClick={handleAccountMenuClose}
        >
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItemLink>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = {
  userLogout: userActions.userLogoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenu);
