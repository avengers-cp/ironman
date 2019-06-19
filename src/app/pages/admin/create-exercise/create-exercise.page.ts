import { Component, OnInit } from '@angular/core';

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

  constructor() {
    window['ce'] = this;
  }

  ngOnInit() {
    this.mainMuscleGroups = _.values(MainMuscleGroup);

    this.abMuscles = _.values(AbMuscle);
    this.armMuscles = _.values(ArmMuscle);
    this.backMuscles = _.values(BackMuscle);
    this.chestMuscles = _.values(ChestMuscle);
    this.legMuscles = _.values(LegMuscle);
    this.shoulderMuscles = _.values(ShoulderMuscle);

    this.equipmentTypes = _.values(EquipmentType);
  }

}
