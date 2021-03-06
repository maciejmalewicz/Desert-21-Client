import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TitleComponent } from './components/common/title/title.component';
import { IconsComponent } from './components/common/icons/icons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAddressInterceptor } from './interceptors/http-address-interceptor';
import { ActivateCodeComponent } from './components/activate-code/activate-code.component';
import { BearerTokenService } from './services/bearer-token.service';
import { MenuComponent } from './components/menu/menu.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { AreasComponent } from './components/game-view/areas/areas.component';
import { HeaderComponent } from './components/game-view/header/header.component';
import { SmallTitleComponent } from './components/game-view/header/small-title/small-title.component';
import { TurnTimerButtonComponent } from './components/game-view/header/turn-timer-button/turn-timer-button.component';
import { ResourcesComponent } from './components/game-view/header/resources/resources.component';
import { ButtonsPanelComponent } from './components/game-view/header/buttons-panel/buttons-panel.component';
import { TurnCounterComponent } from './components/game-view/header/turn-counter/turn-counter.component';
import { PlayersNicknamesComponent } from './components/game-view/header/players-nicknames/players-nicknames.component';
import { HttpTokenInterceptor } from './interceptors/token-interceptor';
import { PlayGameComponent } from './components/menu/play-game/play-game.component';
import { HomeComponent } from './components/menu/home/home.component';
import { HowToPlayComponent } from './components/menu/how-to-play/how-to-play.component';
import { AccountComponent } from './components/menu/account/account.component';
import { FieldStylingDirective } from './directives/field-styling.directive';
import { FieldComponent } from './components/game-view/areas/field/field.component';
import { EnlighterDirective } from './directives/enlighter.directive';
import { RightPanelComponent } from './components/game-view/right-panel/right-panel.component';
import { LeftPanelComponent } from './components/game-view/left-panel/left-panel.component';
import { BuildingPreviewComponent } from './components/game-view/right-panel/building-preview/building-preview.component';
import { UpgradeBuildingButtonComponent } from './components/game-view/right-panel/building-preview/upgrade-building-button/upgrade-building-button.component';
import { PlayersActionsComponent } from './components/game-view/left-panel/players-actions/players-actions.component';
import { ActionEntryComponent } from './components/game-view/left-panel/players-actions/action-entry/action-entry.component';
import { GameModalComponent } from './components/common/game-modal/game-modal.component';
import { UpgradeTooltipComponent } from './components/game-view/right-panel/building-preview/upgrade-building-button/upgrade-tooltip/upgrade-tooltip.component';
import { FactoryTooltipComponent } from './components/game-view/right-panel/building-preview/upgrade-building-button/upgrade-tooltip/factory-tooltip/factory-tooltip.component';
import { TowerTooltipComponent } from './components/game-view/right-panel/building-preview/upgrade-building-button/upgrade-tooltip/tower-tooltip/tower-tooltip.component';
import { ArmyPreviewComponent } from './components/game-view/right-panel/army-preview/army-preview.component';
import { TrainArmyButtonSectionComponent } from './components/game-view/right-panel/army-preview/train-army-section/train-army-button-section/train-army-button-section.component';
import { TrainArmySectionComponent } from './components/game-view/right-panel/army-preview/train-army-section/train-army-section.component';
import { TrainArmyQueueComponent } from './components/game-view/right-panel/army-preview/train-army-section/train-army-queue/train-army-queue.component';
import { DragAndDropFieldsSelectionService } from './services/rx-logic/double-field-selection/drag-and-drop/drag-and-drop-fields-selection.service';
import { DragAndDropSelectionDirective } from './directives/drag-and-drop-selection.directive';
import { DragAndDropCancelableDirective } from './directives/drag-and-drop-cancelable.directive';
import { ShortestPathCalculatorService } from './services/rx-logic/double-field-selection/drag-and-drop/shortest-path-calculator.service';
import { MovementModalComponent } from './components/game-view/movement-modal/movement-modal.component';
import { MoveUnitsComponent } from './components/game-view/movement-modal/move-units/move-units.component';
import { AttackComponent } from './components/game-view/movement-modal/attack/attack.component';
import { BombardComponent } from './components/game-view/movement-modal/bombard/bombard.component';
import { FireRocketComponent } from './components/game-view/movement-modal/fire-rocket/fire-rocket.component';
import { ArmyPickerComponent } from './components/common/army-picker/army-picker.component';
import { ArmyDestinationPreviewComponent } from './components/common/army-destination-preview/army-destination-preview.component';
import { LabComponent } from './components/game-view/lab/lab.component';
import { LabModalComponent } from './components/game-view/lab/lab-modal/lab-modal.component';
import { UpgradeDescriptionComponent } from './components/game-view/lab/upgrade-description/upgrade-description.component';
import { LabTierViewComponent } from './components/game-view/lab/lab-tier-view/lab-tier-view.component';
import { LabUpgradeButtonComponent } from './components/game-view/lab/lab-upgrade-button/lab-upgrade-button.component';
import { BuildBuildingButtonComponent } from './components/game-view/right-panel/building-preview/build-building-button/build-building-button.component';
import { RocketDamageEstimationComponent } from './components/game-view/movement-modal/fire-rocket/rocket-damage-estimation/rocket-damage-estimation.component';
import { RocketBuildingDestructionComponent } from './components/game-view/movement-modal/fire-rocket/rocket-building-destruction/rocket-building-destruction.component';
import { BattleSimulationComponent } from './components/game-view/movement-modal/attack/battle-simulation/battle-simulation.component';
import { ResolutionPhaseModalComponent } from './components/game-view/resolution-phase-modal/resolution-phase-modal.component';
import { NotificationDetailsComponent } from './components/game-view/resolution-phase-modal/notification-details/notification-details.component';
import { ResourcesProducedNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/resources-produced-notification/resources-produced-notification.component';
import { BuildingUpgradedNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/building-upgraded-notification/building-upgraded-notification.component';
import { LabUpgradeNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/lab-upgrade-notification/lab-upgrade-notification.component';
import { RocketStrikeNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/rocket-strike-notification/rocket-strike-notification.component';
import { RocketStrikeOnRocketNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/rocket-strike-on-rocket-notification/rocket-strike-on-rocket-notification.component';
import { BuildingBuiltNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/building-built-notification/building-built-notification.component';
import { UnitsTrainedNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/units-trained-notification/units-trained-notification.component';
import { BombardingNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/bombarding-notification/bombarding-notification.component';
import { BattleAgainstScarabsNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/battle-against-scarabs-notification/battle-against-scarabs-notification.component';
import { BattleAgainstPlayerNotificationComponent } from './components/game-view/resolution-phase-modal/notification-details/battle-against-player-notification/battle-against-player-notification.component';
import { MinimapComponent } from './components/game-view/resolution-phase-modal/minimap/minimap.component';
import { MinimapFieldComponent } from './components/game-view/resolution-phase-modal/minimap/minimap-field/minimap-field.component';
import { MinimapWrapperComponent } from './components/game-view/resolution-phase-modal/minimap-wrapper/minimap-wrapper.component';
import { AnimatedSlideWrapperComponent } from './components/game-view/resolution-phase-modal/animated-slide-wrapper/animated-slide-wrapper.component';
import { ActionCostDisplayComponent } from './components/game-view/left-panel/players-actions/action-entry/action-cost-display/action-cost-display.component';
import { ActionEnlighterDirective } from './directives/action-enlighter.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    TitleComponent,
    IconsComponent,
    ActivateCodeComponent,
    MenuComponent,
    GameViewComponent,
    AreasComponent,
    HeaderComponent,
    SmallTitleComponent,
    TurnTimerButtonComponent,
    ResourcesComponent,
    ButtonsPanelComponent,
    TurnCounterComponent,
    PlayersNicknamesComponent,
    PlayGameComponent,
    HomeComponent,
    HowToPlayComponent,
    AccountComponent,
    FieldStylingDirective,
    FieldComponent,
    EnlighterDirective,
    RightPanelComponent,
    LeftPanelComponent,
    BuildingPreviewComponent,
    UpgradeBuildingButtonComponent,
    PlayersActionsComponent,
    ActionEntryComponent,
    GameModalComponent,
    UpgradeTooltipComponent,
    FactoryTooltipComponent,
    TowerTooltipComponent,
    ArmyPreviewComponent,
    TrainArmyButtonSectionComponent,
    TrainArmySectionComponent,
    TrainArmyQueueComponent,
    DragAndDropSelectionDirective,
    DragAndDropCancelableDirective,
    MovementModalComponent,
    MoveUnitsComponent,
    AttackComponent,
    BombardComponent,
    FireRocketComponent,
    ArmyPickerComponent,
    ArmyDestinationPreviewComponent,
    LabComponent,
    LabModalComponent,
    UpgradeDescriptionComponent,
    LabTierViewComponent,
    LabUpgradeButtonComponent,
    BuildBuildingButtonComponent,
    RocketDamageEstimationComponent,
    RocketBuildingDestructionComponent,
    BattleSimulationComponent,
    ResolutionPhaseModalComponent,
    NotificationDetailsComponent,
    ResourcesProducedNotificationComponent,
    BuildingUpgradedNotificationComponent,
    LabUpgradeNotificationComponent,
    RocketStrikeNotificationComponent,
    RocketStrikeOnRocketNotificationComponent,
    BuildingBuiltNotificationComponent,
    UnitsTrainedNotificationComponent,
    BombardingNotificationComponent,
    BattleAgainstScarabsNotificationComponent,
    BattleAgainstPlayerNotificationComponent,
    MinimapComponent,
    MinimapFieldComponent,
    MinimapWrapperComponent,
    AnimatedSlideWrapperComponent,
    ActionCostDisplayComponent,
    ActionEnlighterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAddressInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    BearerTokenService,
    DragAndDropFieldsSelectionService,
    ShortestPathCalculatorService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
