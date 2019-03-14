import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  },
  typography: { useNextVariants: true }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: { useNextVariants: true }
});
