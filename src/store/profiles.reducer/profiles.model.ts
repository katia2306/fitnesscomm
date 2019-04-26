import { Error } from "../../utils/types.utils";

export interface ProfilesData {
  readonly id: string;
  readonly dailyCalories: number;
  readonly protein: number;
  readonly carbohydrate: number;
  readonly fat: number;
  readonly fiber: number;
  readonly createdAt: firebase.firestore.Timestamp;
}

export interface Profiles {
  readonly data: { [profileId: string]: ProfilesData };
  readonly loaded: boolean;
  readonly createProfileError?: Error;
}

export const initialState: Profiles = {
  data: {},
  loaded: false
};
