/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { History } from "history";
import { ListItem } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";

const RouterLink = (props: LinkProps) => <Link {...props} />;

interface Props extends ListItemProps {
  to: History.LocationDescriptor;
  replace?: boolean;
  ref: React.Ref<{}>;
}

// eslint-disable-next-line react/display-name
const ListItemLink = forwardRef((props: Props, ref) => {
  return (
    <li>
      <ListItem ref={ref} component={RouterLink as any} button {...props} />
    </li>
  );
});

export default ListItemLink;
