import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.iterface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkSatatusResource = rxResource({
    loader:() => this.checkStatus(),
  });

  //Getters de las propiedades privadas de la clase
  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() == 'checking') return 'checking';
    if(this._user())return 'authenticated';
    return 'not-authenticated';
  });
  user = computed<User|null>(() => this._user());
  token = computed(this._token);

  // ¡¡POST LOGIN!!
  login(email:string, password:string): Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    }).pipe(
      map(resp => this.handleAuthSucces(resp)),
      catchError( (error: any) => this.handleAuthError(error)),
    );
  }

  checkStatus(): Observable<boolean>{
    const token = localStorage.getItem('token');
    if(!token){
      this.logout();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      /* headers: {
        Authorization: `Bearer ${token}`,
      } */

    }).pipe(
      map(resp => this.handleAuthSucces(resp)),
      catchError( (error: any) => this.handleAuthError(error)),
    )
  }

  logout(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    //TODO: REVERTIR
    //localStorage.removeItem('token');
  }

  private handleAuthSucces(resp: AuthResponse){
    // Seteamos el user y el token con lo que nos devuelve la respuesta http
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);

    //Guardamos el token en el localStorage (Application en inspeccionar)
    // para que no se pierda la info cuando recargue
    localStorage.setItem('token', resp.token);
    return true;
  }

  private handleAuthError(error: any){
    this.logout();
    return of(false);
  }
}
