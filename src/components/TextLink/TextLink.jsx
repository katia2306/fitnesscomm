import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const RouterLink = props => <Link {...props} />;

const TextLink = props => {
  return (
    <Typography
      style={{ textDecoration: "none" }}
      component={RouterLink}
      {...props}
    />
  );
};

export default TextLink;
