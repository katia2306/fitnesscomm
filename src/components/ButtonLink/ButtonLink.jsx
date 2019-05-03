import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Button, Fab } from "@material-ui/core";
import PropTypes from "prop-types";

const WrappedRouterLink = forwardRef(function RouterLink(props, ref) {
  return <Link ref={ref} {...props} />;
});

const ButtonLink = ({ button, fab, ...restProps }) => {
  if (button) {
    return (
      <Button color="secondary" size="small" disableRipple {...restProps} />
    );
  }

  if (fab) {
    return <Fab component={WrappedRouterLink} {...restProps} />;
  }
  return <Button component={WrappedRouterLink} {...restProps} />;
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
