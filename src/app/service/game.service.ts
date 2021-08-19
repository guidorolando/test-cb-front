import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Game } from '../model/game.model';
import { environment } from 'src/environments/environment';

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
    return environment.backendUrl + '/game/start';
  }
}
