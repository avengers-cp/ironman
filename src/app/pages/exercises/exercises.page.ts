import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnDestroy, OnInit {

  public exercises: Exercise[];

  private exercisesSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  public get exercises$(): Observable<Exercise[]> {
    return this.exerciseService.exercises$;
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.exercisesSubscription = this.exercises$.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

}
