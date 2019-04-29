import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";

const RouterLink = props => <Link {...props} />;

// eslint-disable-next-line react/display-name
const MenuItemLink = forwardRef((props, ref) => {
  return (
    <li>
      <MenuItem ref={ref} component={RouterLink} button {...props} />
    </li>
  );
});

export default MenuItemLink;
