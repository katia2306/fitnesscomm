export interface Theme {
  readonly isThemeDark: boolean;
}

export const initialState: Theme = {
  isThemeDark: localStorage.isThemeDark === "true"
};
