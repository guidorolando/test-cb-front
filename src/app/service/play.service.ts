import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { RegistryGame } from '../model/registry-game.model';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) { }


  bet(registryGame: RegistryGame): Observable<RegistryGame> {
    const url = this.getUrl();
    return this.http.post<RegistryGame>(url, registryGame).pipe(

    );

  }

  getUrl(): string {
    return 'http://localhost:8088/game/registry';
  }
}
