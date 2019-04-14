import { Theme, themeTypes } from "./theme.reducer";
import { User, userTypes } from "./user.reducer";
import { Profiles, profilesTypes } from "./profiles.reducer";

/* Union of every action types */
type ActionTypes = themeTypes | userTypes | profilesTypes;

export interface Action {
  readonly type: ActionTypes;
}

export interface ActionPayload<T> extends Action {
  readonly payload: T;
}
export default interface ReduxModel {
  readonly theme: Theme;
  readonly user: User;
  readonly profiles: Profiles;
}
