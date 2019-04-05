import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Avatar,
  MenuItem,
  Menu,
  ListItemAvatar,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import { AccountBox, ExitToApp } from "@material-ui/icons";
import ReduxModel from "../../store/redux.model";
import { userActions, userSelectors } from "../../store/user.reducer";
import { MenuItemLink } from "..";

interface Props {
  user: ReduxModel["user"];
  userLogout: typeof userActions.userLogoutRequest;
}

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type],
    marginLeft: theme.spacing.unit * 2,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },
  accountMenu: {
    maxWidth: "300px",
    width: "300px",
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
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    color: "#fff",
    backgroundColor: theme.palette.secondary[theme.palette.type]
  }
}));

const AccountMenu = (props: Props) => {
  const { user, userLogout } = props;
  const classes = useStyles();

  const { email, displayName, shortName } = user;

  const [avatarEl, setAvatarEl] = useState<HTMLElement | undefined>(undefined);
  const accountMenuOpen = !!avatarEl;

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarEl(event.currentTarget);
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
          to="/profile"
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
        <MenuItemLink to="/profile" onClick={handleAccountMenuClose}>
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

const mapStateToProps = (state: ReduxModel) => ({
  user: userSelectors.getUser(state)
});

const mapDispatchToProps = {
  userLogout: userActions.userLogoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenu);
