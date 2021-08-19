import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { RegistryGame } from '../model/registry-game.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) { }


  bet(registryGame: RegistryGame): Observable<boolean> {
    const url = this.getUrl();
    return this.http.post<boolean>(url, registryGame).pipe(

    );

  }

  getUrl(): string {
    return environment.backendUrl + '/game/registry';
  }
}
