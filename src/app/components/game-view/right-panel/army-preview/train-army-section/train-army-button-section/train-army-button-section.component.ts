import { Component, ContentChild, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { TrainAction } from 'src/app/models/actions';
import {
  AllCombatBalance,
  CombatUnitConfig,
} from 'src/app/models/game-config-models';
import {
  BoardLocation,
  ResourceSet,
  TrainingMode,
  UnitType,
} from 'src/app/models/game-models';
import {
  FieldSelection,
  GameContext,
} from 'src/app/models/game-utility-models';
import { AvailableResourcesService } from 'src/app/services/rx-logic/shared/available-resources.service';
import { CurrentActionsService } from 'src/app/services/rx-logic/shared/current-actions.service';
import { GameContextService } from 'src/app/services/rx-logic/shared/game-context.service';
import { SelectedFieldService } from 'src/app/services/rx-logic/single-field-selection/selected-field.service';
import { canTrainUnits, getUnitImage } from 'src/app/utils/army-utils';
import { unitTypeToConfig } from 'src/app/utils/balance-utils';
import { ExplainedAvailability } from 'src/app/utils/validation';

type TrainingOption = {
  unitType: UnitType;
  trainingMode: TrainingMode;
};

type EnrichedTrainingOption = TrainingOption & {
  amount: number;
  cost: number;
  imageSource: string;
  availability: ExplainedAvailability;
};

const trainingOptions: Array<TrainingOption> = [
  { unitType: 'DROID', trainingMode: 'SMALL_PRODUCTION' },
  { unitType: 'TANK', trainingMode: 'SMALL_PRODUCTION' },
  { unitType: 'CANNON', trainingMode: 'SMALL_PRODUCTION' },
  { unitType: 'DROID', trainingMode: 'MEDIUM_PRODUCTION' },
  { unitType: 'TANK', trainingMode: 'MEDIUM_PRODUCTION' },
  { unitType: 'CANNON', trainingMode: 'MEDIUM_PRODUCTION' },
  { unitType: 'DROID', trainingMode: 'MASS_PRODUCTION' },
  { unitType: 'TANK', trainingMode: 'MASS_PRODUCTION' },
  { unitType: 'CANNON', trainingMode: 'MASS_PRODUCTION' },
];

@Component({
  selector: 'app-train-army-button-section',
  templateUrl: './train-army-button-section.component.html',
  styleUrls: ['./train-army-button-section.component.scss'],
})
export class TrainArmyButtonSectionComponent implements OnInit, OnDestroy {
  enrichedTrainingOptions: Array<EnrichedTrainingOption> = [];
  location: BoardLocation | null = null;
  isTrainingButtonVisible = false;
  isTrainingButtonDisabled = false;

  private sub1: Subscription;

  constructor(
    private gameContextService: GameContextService,
    private selectedFieldService: SelectedFieldService,
    private currentActionsService: CurrentActionsService,
    private availableResourcesService: AvailableResourcesService
  ) {}

  ngOnInit(): void {
    this.sub1 = combineLatest([
      this.gameContextService.getStateUpdates(),
      this.selectedFieldService.getStateUpdates(),
      this.availableResourcesService.getStateUpdates(),
    ]).subscribe((updates) => {
      const [context, fieldInfo, availableResources] = updates;

      if (fieldInfo === null) {
        return;
      }

      this.location = { row: fieldInfo.row, col: fieldInfo.col };

      this.enrichedTrainingOptions = trainingOptions.map((o) =>
        this.enrichTrainingOption(o, context, fieldInfo, availableResources)
      );
    });

    this.gameContextService.requestState();
    this.selectedFieldService.requestState();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  saveArmyTraining(option: EnrichedTrainingOption): void {
    if (!option.availability.isAvailable) {
      return;
    }
    const action = new TrainAction(
      this.location,
      option.cost,
      option.unitType,
      option.trainingMode,
      option.amount
    );
    this.currentActionsService.pushAction(action);
  }

  private enrichTrainingOption(
    option: TrainingOption,
    context: GameContext,
    fieldSelection: FieldSelection,
    availableResources: ResourceSet
  ): EnrichedTrainingOption {
    const combatConfig = context.balance.combat;
    const config = unitTypeToConfig(combatConfig, option.unitType);
    const amount = this.getProducedAmount(config, option.trainingMode);
    const cost = amount * config.cost;
    const imageSource = getUnitImage(option.unitType);

    const availability = canTrainUnits(
      context.player,
      fieldSelection.field.building,
      option.trainingMode,
      option.unitType,
      availableResources,
      context.balance
    );
    return {
      ...option,
      amount,
      cost,
      imageSource,
      availability,
    };
  }

  private getProducedAmount(
    config: CombatUnitConfig,
    trainingMode: TrainingMode
  ): number {
    switch (trainingMode) {
      case 'SMALL_PRODUCTION':
        return config.smallProduction;
      case 'MEDIUM_PRODUCTION':
        return config.mediumProduction;
      case 'MASS_PRODUCTION':
        return config.massProduction;
    }
  }
}
