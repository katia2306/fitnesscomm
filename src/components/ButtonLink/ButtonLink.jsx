import React from "react";
import { Link } from "react-router-dom";
import { Button, Fab } from "@material-ui/core";
import PropTypes from "prop-types";

const RouterLink = props => <Link {...props} />;

/**
 *
 * @param props
 *
 * render react-router-link if required props are provided
 */
const ButtonLink = ({ button, fab, ...restProps }) => {
  if (button) {
    return (
      <Button color="secondary" size="small" disableRipple {...restProps} />
    );
  }

  if (fab) {
    return <Fab component={RouterLink} {...restProps} />;
  }
  return <Button component={RouterLink} {...restProps} />;
};

ButtonLink.defaultProps = {
  button: false,
  fab: false
};

ButtonLink.propTypes = {
  button: PropTypes.bool,
  fab: PropTypes.bool
};

export default ButtonLink;
