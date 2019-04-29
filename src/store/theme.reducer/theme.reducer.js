export const themeTypes = {
  TOGGLE_THEME_REQUEST: "@@THEME/TOGGLE_THEME_REQUEST",
  TOGGLE_THEME_SUCCESS: "@@THEME/TOGGLE_THEME_SUCCESS"
};

const initialState = {
  isThemeDark: localStorage.isThemeDark === "true"
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case themeTypes.TOGGLE_THEME_SUCCESS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export const themeActions = {
  toggleThemeRequest: payload => ({
    type: themeTypes.TOGGLE_THEME_REQUEST,
    payload
  }),
  toggleThemeSuccess: payload => ({
    type: themeTypes.TOGGLE_THEME_SUCCESS,
    payload
  })
};

export const themeSelectors = {
  getTheme: state => state.theme.isThemeDark
};
