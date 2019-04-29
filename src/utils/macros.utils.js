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
  fat: 9,
  fiber: 0.014
};

export const calculateBMR = (gender, weight, height, age) =>
  gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

export const calculateDailyCalories = (BMR, activity, goal) =>
  Math.round(BMR * activitiesFactor[activity] + goalsFactor[goal]);

export const calculateMacros = (weight, dailyCalories) => {
  const protein = 1.8 * weight * macrosFactor.protein;
  const fat = 0.3 * dailyCalories;
  const carbohydrate = dailyCalories - protein - fat;
  const fiber = dailyCalories * macrosFactor.fiber;

  return {
    protein: Math.round(protein / macrosFactor.protein),
    carbohydrate: Math.round(carbohydrate / macrosFactor.carbohydrate),
    fat: Math.round(fat / macrosFactor.fat),
    fiber: Math.round(fiber)
  };
};
