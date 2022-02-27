import { Injectable } from '@angular/core';
import { BearerTokenService } from './bearer-token.service';
import { StartGameHandlerService } from './notification-handlers/start-game-handler.service';
import { UserInfoService } from './user-info.service';
import { WebSocketAPI } from './websocket-api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private tokenService: BearerTokenService,
    private userInfoService: UserInfoService,
    private startGameHandler: StartGameHandlerService
  ) {}

  webSocketApi: WebSocketAPI | null = null;

  requireServerNotifications() {
    if (this.webSocketApi !== null) {
      return;
    }
    this.userInfoService.getUsersDataUpdates().subscribe((info) => {
      let id = info.id;
      this.webSocketApi = new WebSocketAPI(
        id,
        this.tokenService.getToken(),
        [this.startGameHandler]
      );
      this.webSocketApi._connect();
    });
    this.userInfoService.requestUsersData();
  }
}
