import { Theme, themeTypes } from "./theme.reducer";

/* Union of every action types */
type ActionTypes = themeTypes;

export interface Action {
  readonly type: ActionTypes;
}

export interface ActionPayload<T> {
  readonly type: ActionTypes;
  readonly payload: T;
}
export default interface ReduxModel {
  theme: Theme;
}
