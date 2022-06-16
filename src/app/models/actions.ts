import {
  Army,
  BoardLocation,
  ResourceSet,
  TrainingMode,
  UnitType,
} from './game-models';

export abstract class PlayersAction<ActionContent> {
  abstract getType(): ActionType;
  abstract getCost(): ResourceSet;

  protected abstract toActionAPIRequestBody(): ActionContent;

  toActionAPIBody(): any {
    return {
      type: this.getType(),
      content: this.toActionAPIRequestBody(),
    };
  }
}

export type ActionType =
  | 'LAB_EVENT'
  | 'BUILD'
  | 'UPGRADE'
  | 'TRAIN'
  | 'MOVE_UNITS'
  | 'ATTACK'
  | 'FIRE_ROCKET';

export class UpgradeAction extends PlayersAction<UpgradeActionContent> {
  buildingMaterialsCost: number;
  location: BoardLocation;

  constructor(cost: number, location: BoardLocation) {
    super();
    this.buildingMaterialsCost = cost;
    this.location = location;
  }

  getCost(): ResourceSet {
    return {
      metal: 0,
      buildingMaterials: this.buildingMaterialsCost,
      electricity: 0,
    };
  }

  getType(): ActionType {
    return 'UPGRADE';
  }

  protected toActionAPIRequestBody(): UpgradeActionContent {
    return {
      location: this.location,
    };
  }
}

export class TrainAction extends PlayersAction<TrainActionContent> {
  location: BoardLocation;
  metalCost: number;
  unitType: UnitType;
  trainingMode: TrainingMode;
  amount: number;

  constructor(
    location: BoardLocation,
    metalCost: number,
    unitType: UnitType,
    trainingMode: TrainingMode,
    amount: number
  ) {
    super();
    this.location = location;
    this.metalCost = metalCost;
    this.unitType = unitType;
    this.trainingMode = trainingMode;
    this.amount = amount;
  }

  getType(): ActionType {
    return 'TRAIN';
  }

  getCost(): ResourceSet {
    return { metal: this.metalCost, buildingMaterials: 0, electricity: 0 };
  }

  protected toActionAPIRequestBody(): TrainActionContent {
    return {
      location: this.location,
      unitType: this.unitType,
      trainingMode: this.trainingMode,
    };
  }
}

export class MoveUnitsAction extends PlayersAction<MoveUnitsActionContent> {
  from: BoardLocation;
  to: BoardLocation;
  path: Array<BoardLocation>;
  army: Army;

  constructor(path: Array<BoardLocation>, army: Army) {
    super();
    this.path = path;
    this.from = this.path[0],
    this.to = this.path[this.path.length - 1],
    this.army = army;
  }

  getType(): ActionType {
    return 'MOVE_UNITS';
  }
  getCost(): ResourceSet {
    return { metal: 0, buildingMaterials: 0, electricity: 0 };
  }
  protected toActionAPIRequestBody(): MoveUnitsActionContent {
    return {
      from: this.from,
      to: this.to,
      path: this.path,
      army: this.army,
    };
  }
}

export type UpgradeActionContent = {
  location: BoardLocation;
};

export type TrainActionContent = {
  location: BoardLocation;
  unitType: UnitType;
  trainingMode: TrainingMode;
};

export type MoveUnitsActionContent = {
  from: BoardLocation;
  to: BoardLocation;
  path: Array<BoardLocation>;
  army: Army;
};
