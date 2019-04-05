/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { History } from "history";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

const RouterLink = (props: LinkProps) => <Link {...props} />;

interface Props extends TypographyProps {
  to: History.LocationDescriptor;
  replace?: boolean;
}

const TextLink = (props: Props) => {
  return (
    <Typography
      style={{ textDecoration: "none" }}
      component={RouterLink as any}
      {...props}
    />
  );
};

export default TextLink;
