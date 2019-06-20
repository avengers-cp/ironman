export interface Muscle {
  mainMuscleGroup: MainMuscleGroup;
  name: AbMuscle | ArmMuscle | BackMuscle | ChestMuscle | LegMuscle | ShoulderMuscle;
}

export enum MainMuscleGroup {
  ABS = 'Abdominals',
  ARMS = 'Arms',
  BACK = 'Back',
  CHEST = 'Chest',
  LEGS = 'Legs',
  SHOULDERS = 'Shoulders'
}

export enum AbMuscle {
  LOWER = 'Lower abs',
  MIDDLE = 'Middle abs',
  OBLIQUES = 'Obliques',
  UPPER = 'Upper abs'
}

export enum ArmMuscle {
  BICEP = 'Bicep',
  FOREARM = 'Forearm',
  TRICEP = 'Tricep'
}

export enum BackMuscle {
  LAT = 'Lateral',
  LOWER = 'Lower back',
  MIDDLE = 'Middle back',
  TRAPS = 'Traps'
}

export enum ChestMuscle {
  LOWER = 'Lower chest',
  MIDDLE = 'Middle chest',
  UPPER = 'Upper chest'
}

export enum LegMuscle {
  ABDUCTORS = 'Abductors',
  ADDUCTORS = 'Adductors',
  CALF = 'Calf',
  GLUTES = 'Glutes',
  HAMSTRING = 'Hamstring',
  QUAD = 'Quad'
}

export enum ShoulderMuscle {
  FRONT = 'Front deltoids',
  REAR = 'Rear deltoids',
  SIDE = 'Side deltoids'
}

