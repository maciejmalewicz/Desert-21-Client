import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Army, UnitType } from 'src/app/models/game-models';

@Component({
  selector: 'app-army-picker',
  templateUrl: './army-picker.component.html',
  styleUrls: ['./army-picker.component.scss'],
})
export class ArmyPickerComponent implements OnInit {
  @Input() maxArmy: Army = { droids: 0, tanks: 0, cannons: 0 };

  @Output() armySelectionChanges: EventEmitter<Army> = new EventEmitter<Army>();

  private droidsField = 0;
  private tanksField = 0;
  private cannonsField = 0;

  private armySelection: Army = { droids: 0, tanks: 0, cannons: 0 };

  constructor() {}

  ngOnInit(): void {}

  updateArmySelection(unitType: UnitType, amount: number): void {
    switch (unitType) {
      case 'DROID':
        this.armySelection.droids = amount;
        break;
      case 'TANK':
        this.armySelection.tanks = amount;
        break;
      case 'CANNON':
        this.armySelection.cannons = amount;
        break;
    }
    this.armySelectionChanges.emit(this.armySelection);
  }

  selectMax(unitType: UnitType): void {
    switch (unitType) {
      case 'DROID':
        this.droids = this.maxArmy.droids;
        break;
      case 'TANK':
        this.tanks = this.maxArmy.tanks;
        break;
      case 'CANNON':
        this.cannons = this.maxArmy.cannons;
        break;
    }
  }

  get droids(): number {
    return this.droidsField;
  }

  set droids(droids: number) {
    this.droidsField = droids;
    this.updateArmySelection('DROID', droids);
  }

  get tanks(): number {
    return this.tanksField;
  }

  set tanks(tanks: number) {
    this.tanksField = tanks;
    this.updateArmySelection('TANK', tanks);
  }

  get cannons(): number {
    return this.cannonsField;
  }

  set cannons(cannons: number) {
    this.cannonsField = cannons;
    this.updateArmySelection('CANNON', cannons);
  }
}