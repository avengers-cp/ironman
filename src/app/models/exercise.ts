import { EquipmentType } from './equipment-type.enum';
import { Muscle } from './muscle';

export interface Exercise {
  equipment: EquipmentType;
  id: string;
  name: string;
  targetedMuscles: Muscle[];
}
