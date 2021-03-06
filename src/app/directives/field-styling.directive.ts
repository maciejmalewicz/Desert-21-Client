import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Army, Field } from '../models/game-models';
import { GameContext } from '../models/game-utility-models';
import { PostMovementsArmyMapService } from '../services/rx-logic/double-field-selection/army-movements/post-movements-army-map.service';
import { GameContextService } from '../services/rx-logic/shared/game-context.service';
import { MaxPowerService } from '../services/rx-logic/shared/max-power.service';
import { calculateAttackingArmyPower } from '../utils/army-power-calculator';

@Directive({
  selector: '[appFieldStyling]',
})
export class FieldStylingDirective implements OnInit, OnDestroy {
  constructor(
    private ref: ElementRef,
    private renderer: Renderer2,
    private contextService: GameContextService,
    private maxPowerService: MaxPowerService,
    private postMovementsArmyMapService: PostMovementsArmyMapService
  ) {}

  @Input() row = -1;
  @Input() col = -1;

  field: Field;

  private sub1: Subscription;

  ngOnInit(): void {
    this.sub1 = combineLatest([
      this.contextService.getStateUpdates(),
      this.maxPowerService.getStateUpdates(),
      this.postMovementsArmyMapService.getStateUpdates()
    ]).subscribe((data) => {
      const [context, maxPower, armyMap] = data;
      const game = context.game;
      this.field = game.fields[this.row][this.col];
      const army = armyMap[this.row][this.col];
      const backgroundColor = this.getBackgroundColorByArmyPower(
        context,
        this.field,
        army,
        maxPower
      );
      if (backgroundColor !== null) {
        this.renderer.setStyle(
          this.ref.nativeElement,
          'background-color',
          backgroundColor
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  private getBackgroundColorByArmyPower(
    context: GameContext,
    field: Field,
    army: Army,
    maxPower: number
  ): string | null {
    if (field.ownerId === null || field.army === null) {
      return null;
    }
    const player = context.game.players.find((p) => field.ownerId === p.id);
    const isHostile = player.id !== context.player.id;
    const armyPower = calculateAttackingArmyPower(
      army,
      context.balance,
      player,
    );
    const powerRatio = armyPower / maxPower;
    const opacityRatio = powerRatio * 0.7;
    const red = isHostile ? 255 : 0;
    const green = isHostile ? 0 : 255;
    return `rgba(${red}, ${green}, 0, ${opacityRatio})`;
  }
}
