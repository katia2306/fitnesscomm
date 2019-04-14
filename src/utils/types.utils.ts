import {
  ButtonLinkProps,
  WithButtonProps
} from "../components/ButtonLink/ButtonLink";

export const isNotLinkButton = (
  props: ButtonLinkProps
): props is WithButtonProps => {
  return (props as WithButtonProps).button !== undefined;
};

export interface Error {
  code: string;
  message: string;
}
