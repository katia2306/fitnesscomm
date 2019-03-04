import { Theme, types as themeTypes } from "./reducers/theme.reducer";

/* Union of every action types */
type ActionTypes = themeTypes;

export interface Action<T> {
  readonly type: ActionTypes;
  readonly payload?: T;
}

export default interface ReduxModel {
  theme: Theme;
}
