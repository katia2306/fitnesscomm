/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { History } from "history";
import { MenuItem } from "@material-ui/core";
import { MenuItemProps } from "@material-ui/core/MenuItem";

const RouterLink = (props: LinkProps) => <Link {...props} />;

interface Props extends MenuItemProps {
  to: History.LocationDescriptor;
  replace?: boolean;
  ref: React.Ref<{}>;
}

// eslint-disable-next-line react/display-name
const MenuItemLink = forwardRef((props: Props, ref) => {
  return (
    <li>
      <MenuItem ref={ref} component={RouterLink as any} {...props} />
    </li>
  );
});

export default MenuItemLink;
