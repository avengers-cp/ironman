import { EquipmentType } from './equipment-type.enum';
import { Muscle } from './muscle';

export interface ExerciseForm {
  description: string;
  equipment: EquipmentType;
  name: string;
  musclesTargeted: Muscle[];
}

export interface Exercise extends ExerciseForm {
  id: string;
}
