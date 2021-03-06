import { Injectable } from '@angular/core';
import { Field } from 'src/app/models/game-models';
import { GameContext } from 'src/app/models/game-utility-models';
import { calculateAttackingArmyPower } from 'src/app/utils/army-power-calculator';
import { flattenFields } from 'src/app/utils/location-utils';
import { GameContextService } from './game-context.service';
import { ResourceProcessor } from '../templates/resource-processor';

@Injectable({
  providedIn: 'root',
})
export class MaxPowerService extends ResourceProcessor<number> {
  constructor(private contextService: GameContextService) {
    super([contextService]);
  }

  protected processData(dataElements: any[]): number {
    const [context] = dataElements as [GameContext];
    const allFields = flattenFields(context.game.fields);
    const occupiedFields = allFields.filter((field) => field.ownerId !== null);
    const occupiedFieldsWithArmy = occupiedFields.filter(
      (field) => field.army !== null
    );
    return occupiedFieldsWithArmy
      .map((field) => this.fieldToArmyPower(field, context))
      .reduce(this.maxOf, 1);
  }

  private fieldToArmyPower(field: Field, context: GameContext): number {
    const player = context.game.players.find((p) => p.id === field.ownerId);
    return calculateAttackingArmyPower(
      field.army,
      context.balance,
      player,
    );
  }

  private maxOf(prev: number, next: number): number {
    if (next > prev) {
      return next;
    }
    return prev;
  }
}
