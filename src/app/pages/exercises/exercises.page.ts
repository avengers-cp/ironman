import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  public exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) {
    this.exercises$.subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    });
  }

  public get exercises$(): Observable<Exercise[]> {
    return this.exerciseService.exercises$;
  }

  ngOnInit() {
  }

}
