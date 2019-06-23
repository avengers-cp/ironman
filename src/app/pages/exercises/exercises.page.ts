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
  private exercisesSub: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnDestroy() {
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.exercisesSub = this.exercises$.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  private get exercises$(): Observable<Exercise[]> {
    return this.exerciseService.exercises$;
  }
}
