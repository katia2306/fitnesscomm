import {
  WithButtonProps,
  WithLinkProps
} from "../components/ButtonLink/ButtonLink";

export const isLinkButton = (
  props: WithButtonProps | WithLinkProps
): props is WithLinkProps => {
  return (props as WithLinkProps).to !== undefined;
};
