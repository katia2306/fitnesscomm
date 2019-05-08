import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";

const WrappedRouterLink = forwardRef(function RouterLink(props, ref) {
  return <Link ref={ref} {...props} />;
});

// eslint-disable-next-line react/no-multi-comp
const WrappedMenuItemLink = forwardRef(function MenuItemLink(props, ref) {
  return (
    <li>
      <MenuItem ref={ref} component={WrappedRouterLink} button {...props} />
    </li>
  );
});

export default WrappedMenuItemLink;
