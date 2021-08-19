import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StompState } from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';
import { Message } from 'stompjs';
import { defaultGame, Game } from '../model/game.model';
import { RegistryGame } from '../model/registry-game.model';
import { GameService } from '../service/game.service';
import { PlayService } from '../service/play.service';
import { WebsocketService } from '../ws/websocket.service';


const WS_URL = environment.webSocketUrl;
const BRODCAST_URL = '/topic/server-broadcaster';
const UPDATE_GAME_STATUS_URL = '/topic/players';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private broadcastService: WebsocketService;
  private registryService: WebsocketService;
  public players: string[] = [];
  state: string = 'NOT CONNECTED';
  time: number = 0;
  game: Game = defaultGame;
  betSent: boolean = false;

  form: FormGroup;

  constructor(
    private gameService: GameService,
    private playService: PlayService,
    private _snackBar: MatSnackBar
  ) { 

    this.getGame();
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'betValue': new FormControl('', [Validators.required])
    });

    this.broadcastService = new WebsocketService(WS_URL, BRODCAST_URL);
    this.broadcastService.stream().subscribe((message: Message) => {
      const json = JSON.parse(message.body);
      if(json.length > 0) {
        this.openSnackBar(json, 'close')
      }
      this.getGame();
    });
    this.broadcastService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
    });


    this.registryService = new WebsocketService(WS_URL, UPDATE_GAME_STATUS_URL);
    this.registryService.stream().subscribe((message: Message) => {
      this.players.push(message.body);
    });

  }

  ngOnInit(): void {
    this.start(); 
  }

  sendBet() {
    if(this.form.valid) {
      const playRequest = {
        gameId: this.game.id,
        betValue: this.form.value.betValue,
        email: this.form.value.email
      };
      this.playService.bet(playRequest).subscribe(response => {
        if(response) {
          this.sendAction(playRequest);
          this.betSent = true;
        }
      });
    }
  }

  sendAction(registryGame: RegistryGame) {
    this.registryService.send('/app/registry', registryGame)
  }

  disabledButton(): boolean {
    if(this.time <= 5) {
      return true;
    } else {
      return false;
    }
  }

  intervalId = 0;
  seconds = 0;
  clearTimer() { clearInterval(this.time); }

  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        this.time = 0;
      }
    }, 1000);
  }

  private getGame(): void {
    this.gameService.start().subscribe((response: Game) => {
      this.game = response;
      const dateNow = new Date();
      this.time = Math.floor((response.endTime - dateNow.getTime())/ 1000);
      this.players = [];
      this.betSent = false;
    })
  }

  openSnackBar(message: any[], action: string) {
    const winners = message.map(item => item.email);
    const joinWinners = winners.join(',')
    this._snackBar.open('WINNERS: ' + joinWinners, action, {verticalPosition: 'top'});
  }

}
