/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LinkProps, Link } from "react-router-dom";
import { History } from "history";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Fab, { FabProps } from "@material-ui/core/Fab";
import { isNotLinkButton } from "../../utils/types.utils";

const RouterLink = (props: LinkProps) => <Link {...props} />;

export interface WithButtonProps extends ButtonProps {
  button: boolean;
}

export interface WithLinkProps extends ButtonProps {
  fab?: boolean;
  to: History.LocationDescriptor;
  replace?: boolean;
}

export interface WithFabProps extends FabProps {
  fab: boolean;
  to: History.LocationDescriptor;
  replace?: boolean;
}

export type ButtonLinkProps = WithLinkProps | WithFabProps | WithButtonProps;

/**
 *
 * @param props
 *
 * render react-router-link if required props are provided
 */
const ButtonLink = (props: ButtonLinkProps) => {
  if (isNotLinkButton(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { button, ...restProps } = props;
    return (
      <Button color="secondary" size="small" disableRipple {...restProps} />
    );
  }

  const { fab, ...restProps } = props;

  if (fab) {
    return <Fab component={RouterLink as any} {...restProps as WithFabProps} />;
  }
  return (
    <Button component={RouterLink as any} {...restProps as WithLinkProps} />
  );
};

export default ButtonLink;
