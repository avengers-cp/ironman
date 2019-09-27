import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EquipmentType } from './../../../models/equipment-type.enum';
import { Muscle } from './../../../models/muscle';

import { ExerciseService } from './../../../services/exercise.service';
import { ToastService } from './../../../services/toast.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

  public equipmentTypes: string[];
  public muscles: string[];
  public exerciseForm: FormGroup;

  constructor(
    private exerciseService: ExerciseService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initForm();

    // Initialise all our options.
    this.muscles = _.values(Muscle);
    this.equipmentTypes = _.values(EquipmentType);
  }

  /**
   * Submit the form to FireBase.
   */
  public onSubmit(): void {
    if (this.exerciseForm.valid) {
      try {
        this.exerciseService.createExercise(this.exerciseForm.value);
        this.exerciseForm.reset();
      } catch (error) {
        console.error(error);
        if (error.message) {
          this.toastService.showErrorToast(error.message);
        } else {
          this.toastService.showErrorToast('An error occured. Please try again');
        }
      }
    } else {
      this.toastService.showErrorToast('ERROR: the form is invalid.');
    }
  }

  /**
   * Initialise the exercise form.
   */
  private initForm(): void {
    this.exerciseForm = this.formBuilder.group({
      name: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.required
      ],
      equipment: [
        '',
        Validators.required
      ],
      musclesTargeted: [
        [],
        Validators.required
      ]
    });
  }

}
