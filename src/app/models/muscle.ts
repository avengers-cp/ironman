export interface Muscle {
  mainMuscleGroup: MainMuscleGroup;
  name: AbMuscle | ArmMuscle | BackMuscle | ChestMuscle | LegMuscle | ShoulderMuscle;
}

export enum MainMuscleGroup {
  ABS = 'abdominals',
  ARMS = 'arms',
  BACK = 'back',
  CHEST = 'chest',
  LEGS = 'legs',
  SHOULDERS = 'shoulders'
}

export enum AbMuscle {
  LOWER = 'lower abs',
  MIDDLE = 'middle abs',
  OBLIQUES = 'obliques',
  UPPER = 'upper abs'
}

export enum ArmMuscle {
  BICEP = 'bicep',
  FOREARM = 'forearm',
  TRICEP = 'tricep'
}

export enum BackMuscle {
  LAT = 'lateral',
  LOWER = 'lower back',
  MIDDLE = 'middle back',
  TRAPS = 'traps'
}

export enum ChestMuscle {
  LOWER = 'lower chest',
  MIDDLE = 'middle chest',
  UPPER = 'upper chest'
}

export enum LegMuscle {
  ABDUCTORS = 'abductors',
  ADDUCTORS = 'adductors',
  CALF = 'calf',
  GLUTES = 'glutes',
  HAMSTRING = 'hamstring',
  QUAD = 'quad'
}

export enum ShoulderMuscle {
  FRONT = 'front deltoids',
  REAR = 'rear deltoids',
  SIDE = 'side deltoids'
}

