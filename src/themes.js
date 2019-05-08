import { createMuiTheme } from "@material-ui/core/styles";

const customTheme = {
  appDrawer: {
    width: 250
  }
};

export const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  },
  ...customTheme
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  },
  ...customTheme
});
