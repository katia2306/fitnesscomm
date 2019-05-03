import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";

const WrappedRouterLink = forwardRef(function RouterLink(props, ref) {
  return <Link ref={ref} {...props} />;
});

const ListItemLink = props => {
  return (
    <li>
      <ListItem component={WrappedRouterLink} button {...props} />
    </li>
  );
};

export default ListItemLink;
