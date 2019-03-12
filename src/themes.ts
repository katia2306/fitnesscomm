import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  },
  overrides: {
    MuiPaper: {
      root: {
        background: "linear-gradient(to right, #ffffff, #f9f6f4);"
      }
    }
  },
  typography: { useNextVariants: true }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  },
  overrides: {
    MuiPaper: {
      root: {
        background: "linear-gradient(to right, #232526, #424242)"
      }
    }
  },
  typography: { useNextVariants: true }
});
