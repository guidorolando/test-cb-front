import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Game } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  start(): Observable<Game> {
    const url = this.getUrl();
    return this.http.get<Game>(url);
  }

  

  getUrl(): string {
    return 'http://localhost:8088/game/start';
  }
}
