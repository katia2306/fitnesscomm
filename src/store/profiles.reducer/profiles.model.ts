import { Error } from "../../utils/types.utils";

export interface ProfilesData {
  readonly dailyCalories: number;
  readonly protein: number;
  readonly carbohydrate: number;
  readonly fat: number;
  readonly fiber: number;
}

export interface Profiles {
  readonly data: ProfilesData[];
  readonly createProfileError?: Error;
}

export const initialState: Profiles = {
  data: []
};
