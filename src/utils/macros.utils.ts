import { CaloriesCalculatorProps } from "../components/CaloriesCalculator/CaloriesCalculator";

const activitiesFactor = {
  none: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  intense: 1.9
};

const goalsFactor = {
  moderateLoss: -250,
  rapidLoss: -500,
  maintenance: 0,
  moderateGain: 250,
  rapidGain: 500
};

const macrosFactor = {
  protein: 4,
  carbohydrate: 4,
  fat: 9
};

export const calculateBMR = (
  gender: CaloriesCalculatorProps["gender"],
  weight: number,
  height: number,
  age: number
): number =>
  gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

export const calculateDailyCalories = (
  BMR: number,
  activity: CaloriesCalculatorProps["activity"],
  goal: CaloriesCalculatorProps["goal"]
): number => BMR * activitiesFactor[activity] + goalsFactor[goal];

export const calculateMacros = (
  weight: number,
  dailyCalories: number
): { protein: number; carbohydrate: number; fat: number } => {
  const protein = 1.8 * weight * macrosFactor.protein;
  const fat = 0.3 * dailyCalories;
  const carbohydrate = dailyCalories - protein - fat;

  return {
    protein: protein / macrosFactor.protein,
    carbohydrate: carbohydrate / macrosFactor.carbohydrate,
    fat: fat / macrosFactor.fat
  };
};
