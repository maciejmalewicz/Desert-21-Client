import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildBuildingAction } from 'src/app/models/actions';
import { BoardLocation } from 'src/app/models/game-models';
import { CurrentActionsService } from 'src/app/services/rx-logic/shared/current-actions.service';
import {
  BuildBuildingOptionsService,
  EnrichedBuildingOption,
} from 'src/app/services/rx-logic/single-field-selection/build-building-options.service';
import { SelectedFieldService } from 'src/app/services/rx-logic/single-field-selection/selected-field.service';

@Component({
  selector: 'app-build-building-button',
  templateUrl: './build-building-button.component.html',
  styleUrls: ['./build-building-button.component.scss'],
})
export class BuildBuildingButtonComponent implements OnInit, OnDestroy {
  buildingOptions: Array<EnrichedBuildingOption> = [];
  location: BoardLocation | null = null;

  private sub1: Subscription;
  private sub2: Subscription;

  constructor(
    private buildingOptionsService: BuildBuildingOptionsService,
    private currentActionsService: CurrentActionsService,
    private fieldSelectionService: SelectedFieldService
  ) {}

  ngOnInit(): void {
    this.sub1 = this.buildingOptionsService
      .getStateUpdates()
      .subscribe((options) => {
        this.buildingOptions = options;
      });
    this.sub2 = this.fieldSelectionService
      .getStateUpdates()
      .subscribe((fieldSelection) => {
        this.location = { row: fieldSelection.row, col: fieldSelection.col };
      });
    this.buildingOptionsService.requestState();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  buildBuilding(option: EnrichedBuildingOption): void {
    const action = new BuildBuildingAction(
      this.location,
      option.buildingType,
      option.buildingMaterialsCost
    );
    this.currentActionsService.pushAction(action);
  }
}
