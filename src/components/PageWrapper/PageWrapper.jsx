import React from "react";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start"
  },
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    position: "relative",
    width: "100%"
  },
  scroll: {
    overflowY: "auto",
    overflowX: "hidden"
  }
});

const PageWrapper = ({
  children,
  container,
  scroll,
  className: classNameProp,
  component: componentProp
}) => {
  const classes = useStyles();
  const className = classNames(
    classes.root,
    { [classes.container]: container },
    { [classes.scroll]: scroll },
    classNameProp
  );

  let Component = container ? "section" : "div";
  if (componentProp) {
    Component = componentProp;
  }

  return <Component className={className}>{children}</Component>;
};

PageWrapper.defaultProps = {
  className: "",
  container: false,
  scroll: false,
  component: undefined
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  container: PropTypes.bool,
  scroll: PropTypes.bool,
  component: PropTypes.node
};

export default PageWrapper;
