import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Muscle } from '../models/muscle';
import { EquipmentType } from '../models/equipment-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  public exercises$: Observable<Exercise[]>;
  private exercisesCollection: AngularFirestoreCollection<Exercise>;

  constructor(private firestore: AngularFirestore) {
    this.exercisesCollection = this.firestore.collection<Exercise>('exercises');
    this.exercises$ = this.exercisesCollection.valueChanges();
  }

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
    return this.exercisesCollection.doc<Exercise>(id).set(exercise);
  }

  /**
   * Delete an exercise from the database.
   * @param exerciseId - The ID of the exercise to delete.
   * @returns - Resolves a promise when the exercise has been deleted.
   */
  public deleteExercise(exerciseId: string): Promise<void> {
    return this.exercisesCollection.doc<Exercise>(exerciseId).delete();
  }

  /**
   * Update the exercise object in the database.
   * @param exercise - The exercise object that has been updated.
   * @returns - Resolves a promise when the exercise has been updated.
   */
  public updateExercise(exercise: Exercise): Promise<void> {
    return this.exercisesCollection.doc<Exercise>(exercise.id).set(exercise, {merge: true});
  }
}
