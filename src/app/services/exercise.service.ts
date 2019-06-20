import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Muscle } from '../models/muscle';
import { EquipmentType } from '../models/equipment-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private firestore: AngularFirestore) { }

  public createExercise(equipment: EquipmentType, name: string, targetedMuscles: Muscle[]): Promise<void> {
    const id = this.firestore.createId();
    const exercise: Exercise = {
      equipment,
      id,
      name,
      targetedMuscles
    };
    return this.firestore.doc<Exercise>(`exercises/${id}`).set(exercise);
  }
}
