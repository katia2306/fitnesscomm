import { IThemeState, types as themeTypes } from './reducers/theme.reducer';

/* Union of every action types */
type ActionTypes = themeTypes;

export interface IAction<T> {
  readonly type: ActionTypes;
  readonly payload?: T;
}

export default interface IReduxState {
  theme: IThemeState;
}
