import { Injectable } from '@angular/core';
import { BearerTokenService } from './bearer-token.service';
import { UserInfoService } from './http/user-info.service';
import { NextTurnHandlerService } from './notification-handlers/next-turn-handler.service';
import { ResolutionPhaseHandlerService } from './notification-handlers/resolution-phase-handler.service';
import { StartGameHandlerService } from './notification-handlers/start-game-handler.service';
import { WebSocketAPI } from './websocket-api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private tokenService: BearerTokenService,
    private userInfoService: UserInfoService,
    private nextTurnHandler: NextTurnHandlerService,
    private startGameHandler: StartGameHandlerService,
    private resolutionPhaseHandler: ResolutionPhaseHandlerService
  ) {}

  webSocketApi: WebSocketAPI | null = null;

  requireServerNotifications(): void {
    if (this.webSocketApi !== null) {
      return;
    }
    this.userInfoService.getStateUpdates().subscribe((info) => {
      const id = info.id;
      if (this.webSocketApi === null || this.webSocketApi.userId !== id) {
        this.webSocketApi = new WebSocketAPI(id, this.tokenService.getToken(), [
          this.nextTurnHandler,
          this.startGameHandler,
          this.resolutionPhaseHandler,
        ]);
        this.webSocketApi._connect();
      }
    });
    this.userInfoService.requestState();
  }
}
