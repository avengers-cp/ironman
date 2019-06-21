import { EquipmentType } from './equipment-type.enum';
import { Muscle } from './muscle';

export interface ExerciseForm {
  description: string;
  equipment: EquipmentType;
  name: string;
  targetedMuscles: Muscle[];
}

export interface Exercise extends ExerciseForm {
  id: string;
}
