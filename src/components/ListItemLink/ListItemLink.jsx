import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";

const RouterLink = props => <Link {...props} />;

// eslint-disable-next-line react/display-name
const ListItemLink = forwardRef((props, ref) => {
  return (
    <li>
      <ListItem ref={ref} component={RouterLink} button {...props} />
    </li>
  );
});

export default ListItemLink;
