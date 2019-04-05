/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LinkProps, Link } from "react-router-dom";
import { History } from "history";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { isLinkButton } from "../../utils/types.utils";

const RouterLink = (props: LinkProps) => <Link {...props} />;

export interface WithButtonProps extends ButtonProps {
  button: boolean;
}

export interface WithLinkProps extends ButtonProps {
  to: History.LocationDescriptor;
  replace?: boolean;
}

type Props = WithLinkProps | WithButtonProps;

/**
 *
 * @param props
 *
 * render react-router-link if required props are provided
 */
const ButtonLink = (props: Props) => {
  if (isLinkButton(props)) {
    return <Button component={RouterLink as any} {...props} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { button, ...restProps } = props;
  return <Button color="secondary" size="small" disableRipple {...restProps} />;
};

export default ButtonLink;
