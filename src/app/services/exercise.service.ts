import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Exercise, ExerciseForm } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  public exercises$: Observable<Exercise[]>;
  private exercisesCollection: AngularFirestoreCollection<Exercise>;

  constructor(private firestore: AngularFirestore) {
    this.exercisesCollection = this.firestore
      .collection<Exercise>(
        'exercises',
        query => query.orderBy('name')
      );

    this.exercises$ = this.exercisesCollection.valueChanges();
  }

  /**
   * Create an exercise and add it to the list of exercises in the database.
   * @param exerciseForm - The values entered by the user in the exercise form.
   * @returns - Resolves when the exercise has been created.
   */
  public createExercise(exerciseForm: ExerciseForm): Promise<void> {
    const id = this.firestore.createId();
    const exercise: Exercise = {
      id,
      ...exerciseForm
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
