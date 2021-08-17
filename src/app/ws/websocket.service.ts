import { Injectable } from '@angular/core';
import { StompConfig, StompService, StompState } from '@stomp/ng2-stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from 'stompjs';

export class WebsocketService {
  private messages: Observable<Message>;
  private stompService: StompService;

  constructor(socketUrl: string, streamUrl: string) {
    let stompConfig: StompConfig = {
      url: socketUrl,
      headers: {
        login: '',
        passCode: ''
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };
    this.stompService = new StompService(stompConfig);
    this.messages = this.stompService.subscribe(streamUrl);
  }
  public stream(): Observable<Message> {
    return this.messages;
  }

  public send(url: string, message: any) {
    return this.stompService.publish(url, JSON.stringify(message));
  }

  public state(): BehaviorSubject<StompState> {
    console.log(this.stompService);
    return this.stompService.state;
  }

}
