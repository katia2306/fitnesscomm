import { Theme, themeTypes } from "./theme.reducer";
import { User, userTypes } from "./user.reducer";

/* Union of every action types */
type ActionTypes = themeTypes | userTypes;

export interface Action {
  readonly type: ActionTypes;
}

export interface ActionPayload<T> {
  readonly type: ActionTypes;
  readonly payload: T;
}
export default interface ReduxModel {
  theme: Theme;
  user: User;
}
