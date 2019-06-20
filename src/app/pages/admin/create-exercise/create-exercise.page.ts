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
  public muscleNames: any = {};

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
    _.set(this.muscleNames, MainMuscleGroup.ABS, _.values(AbMuscle));
    _.set(this.muscleNames, MainMuscleGroup.ARMS, _.values(ArmMuscle));
    _.set(this.muscleNames, MainMuscleGroup.BACK, _.values(BackMuscle));
    _.set(this.muscleNames, MainMuscleGroup.CHEST, _.values(ChestMuscle));
    _.set(this.muscleNames, MainMuscleGroup.LEGS, _.values(LegMuscle));
    _.set(this.muscleNames, MainMuscleGroup.SHOULDERS, _.values(ShoulderMuscle));
    this.equipmentTypes = _.values(EquipmentType);
  }

  /**
   * Get the muscles sub-form from the exercise form.
   * @returns - The muscles form.
   */
  public get muscleForms(): FormArray {
    return this.exerciseForm.get('muscles') as FormArray;
  }

  /**
   * Add a new muscle to the muscles FormArray.
   *
   * @param muscle - The new muscle to be added to the muscles FormArray.
   */
  public addMuscle(): void {
    const muscle: FormGroup = this.formBuilder.group({
      mainMuscleGroup: [
        '',
        Validators.required
      ],
      muscleName: [
        '',
        Validators.required
      ]
    });
    this.muscleForms.push(muscle);
  }

  /**
   * Delete a muscle.
   *
   * @param index - The index position of the muscle in the muscles FormArray to be deleted.
   */
  public deleteMuscle(index: number): void {
    this.muscleForms.removeAt(index);
  }

  /**
   * Get the list of muscle names depending on which mainMuscleGroup was selected.
   * @param index - The index of the muscle form group.
   * @returns - an array of the muscle names.
   */
  public getMuscleNamesForGroup(index: number): string[] {
    const muscleForm = this.muscleForms.controls[index] as FormGroup;
    const mainMuscleGroup: string = muscleForm.value.mainMuscleGroup;
    return this.muscleNames[mainMuscleGroup];
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
      muscles: this.formBuilder.array([])
    });
  }

}
