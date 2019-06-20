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
  public mainMuscleGroups: string[];
  public muscleNames: any = {};
  public exerciseForm: FormGroup;

  private deletingMuscle: any;

  constructor(
    private exerciseService: ExerciseService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) { }

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
   * Check if you can delete the muscleForm.
   * At least one muscle must be selected.
   */
  public get isDeleteMuscleDisabled(): boolean {
    return this.muscleForms.length <= 1;
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
  public deleteMuscle(index: number, muscle: any): void {
    this.deletingMuscle = muscle;
    setTimeout(() => {
      this.muscleForms.removeAt(index);
      this.deletingMuscle = null;
    }, 200);
  }

  /**
   * Check if a given muscle is being deleted.
   * @param muscle - The muscle to check if it is being deleted.
   * @returns - True if the given muscle is being deleted.
   */
  public isDeleting(muscle: any): boolean {
    return this.deletingMuscle === muscle;
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
   * Submit the form to FireBase.
   */
  public onSubmit(): void {
    if (this.exerciseForm.valid) {
      const { name, equipment } = this.exerciseForm.value;
      const targetedMuscles = this.muscleForms.value;
      console.log({name, equipment, targetedMuscles});
      try {
        this.exerciseService.createExercise(equipment, name, targetedMuscles);
        this.exerciseForm.reset();
      } catch (error) {
        console.error(error);
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
      equipment: [
        '',
        Validators.required
      ],
      muscles: this.formBuilder.array([])
    });
    this.addMuscle();
  }

}
