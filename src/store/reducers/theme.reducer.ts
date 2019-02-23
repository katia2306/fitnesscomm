export const types = {
  TOGGLE_THEME: 'TOGGLE_THEME'
};

const initialState = {
  isThemeDark: localStorage.isThemeDark === 'true'
};

export default (state = initialState, { type }) => {
  switch (type) {
    case types.TOGGLE_THEME: {
      const isThemeDark = !state.isThemeDark;
      localStorage.isThemeDark = isThemeDark;
      return { ...state, isThemeDark };
    }

    default:
      return state;
  }
};

export const actions = {
  toggleTheme: () => ({
    type: types.TOGGLE_THEME
  })
};
