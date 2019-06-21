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

  /**
   * Create an exercise and add it to the list of exercises in the database.
   * @param equipment - Equipment required for the exercise.
   * @param name - Name of the exercise.
   * @param targetedMuscles - Muscles targetted by the exercise.
   * @returns - Resolves when the exercise has been created.
   */
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
