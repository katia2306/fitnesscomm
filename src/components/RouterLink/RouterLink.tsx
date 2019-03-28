/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { Link, LinkProps, Route } from "react-router-dom";
import { History } from "history";

const RenderLink = (props: LinkProps) => {
  return <Route>{({ match }) => <Link replace={!!match} {...props} />}</Route>;
};

/**
 * Workaround to render React Router Link insde Material-UI Components.
 * This is until a cleaner option exists.
 *
 * Args:
 *  component: Any Material-UI component
 * ...other: Props for Material-UI component
 */

interface Props {
  component: React.ElementType<any>;
  to: History.LocationDescriptor;
  [key: string]: any;
}

const RouterLink = forwardRef((props: Props, ref) => {
  const { component: Component, ...other } = props;

  return <Component ref={ref} component={RenderLink as any} {...other} />;
});

export default RouterLink;
