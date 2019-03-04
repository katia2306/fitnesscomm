import { TransitionStatus } from "react-transition-group/Transition";

export type TransitionStyles = {
  [key in TransitionStatus]?: { [key: string]: string | number }
};
