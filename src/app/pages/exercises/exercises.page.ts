import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnDestroy, OnInit {

  public filteredExercises: Exercise[];
  public isLoading: boolean;

  public exercises: Exercise[];
  private exercisesSub: Subscription;
  private filterString: string;

  constructor(private exerciseService: ExerciseService) {
    this.filterString = '';
    this.isLoading = true;
  }

  ngOnDestroy() {
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.exercisesSub = this.exercises$.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
      if (exercises && this.isLoading) {
        this.isLoading = false;
      }
      this.filterExercises(this.filterString);
    });
  }

  public filterExercises(filterString: string): void {
    if (filterString) {
      this.filteredExercises = _.filter(this.exercises, (exercise: Exercise) => {
        return (
          // Filter by exercise name
          _.includes(_.lowerCase(exercise.name), _.lowerCase(filterString)) ||

          // Filter by exercise equipment
          _.includes(_.lowerCase(exercise.equipment), _.lowerCase(filterString)) ||

          // Filter by muscles targeted
          _.includes(_.lowerCase(_.join(exercise.musclesTargeted)), _.lowerCase(filterString))
        );
      });
    } else {
      this.filterString = '';
      this.filteredExercises = this.exercises;
    }
  }

  private get exercises$(): Observable<Exercise[]> {
    return this.exerciseService.exercises$;
  }
}
