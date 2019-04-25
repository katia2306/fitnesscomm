/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonLinkProps,
  WithButtonProps
} from "../components/ButtonLink/ButtonLink";
import ReduxModel from "../store/redux.model";

export const isNotLinkButton = (
  props: ButtonLinkProps
): props is WithButtonProps => {
  return (props as WithButtonProps).button !== undefined;
};

export interface Error {
  code: string;
  message: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ReduxSelectors {
  [key: string]: (state: ReduxModel, props?: any) => any;
}
