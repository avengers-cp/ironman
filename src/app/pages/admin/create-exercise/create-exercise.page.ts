import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { EquipmentType } from './../../../models/equipment-type.enum';
import {
  AbMuscle,
  ArmMuscle,
  BackMuscle,
  ChestMuscle,
  LegMuscle,
  MainMuscleGroup,
  ShoulderMuscle
} from './../../../models/muscle';

import * as _ from 'lodash';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

  public mainMuscleGroups: string[];
  public abMuscles: string[];
  public armMuscles: string[];
  public backMuscles: string[];
  public chestMuscles: string[];
  public legMuscles: string[];
  public shoulderMuscles: string[];
  public equipmentTypes: string[];

  public exerciseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // TODO: remove this window object.
    const ce = 'ce';
    window[ce] = this;
  }

  ngOnInit() {
    this.initForm();

    // Initialise all our options.
    this.mainMuscleGroups = _.values(MainMuscleGroup);
    this.abMuscles = _.values(AbMuscle);
    this.armMuscles = _.values(ArmMuscle);
    this.backMuscles = _.values(BackMuscle);
    this.chestMuscles = _.values(ChestMuscle);
    this.legMuscles = _.values(LegMuscle);
    this.shoulderMuscles = _.values(ShoulderMuscle);
    this.equipmentTypes = _.values(EquipmentType);
  }

  /**
   * Get the muscles sub-form from the exercise form.
   * @returns - The muscles form.
   */
  public get musclesForm(): FormArray {
    return this.exerciseForm.get('muscles') as FormArray;
  }

  /**
   * Add a new muscle to the muscles FormArray.
   *
   * @param muscle - The new muscle to be added to the muscles FormArray.
   */
  public addMuscle(): void {
    this.musclesForm.push(this.formBuilder.control('', Validators.required));
  }

  /**
   * Delete a muscle.
   *
   * @param index - The index position of the muscle in the muscles FormArray to be deleted.
   */
  public deleteMuscle(index: number): void {
    this.musclesForm.removeAt(index);
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
      equipmentType: [
        '',
        Validators.required
      ],
      musclesForm: this.formBuilder.array([])
    });
  }

}
