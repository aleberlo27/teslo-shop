import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.iterface';
import { tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(null);

  private http = inject(HttpClient);

  //Getters de las propiedades privadas de la clase
  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() == 'checking') return 'checking';
    if(this._user())return 'authenticated';
    return 'not-authenticated';
  });
  user = computed<User|null>(() => this._user());
  token = computed(this._token);

  // ¡¡POST LOGIN!!
  login(email:string, password:string){
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password,
    }).pipe(
      tap(resp => {
        this._authStatus.set('authenticated');
        // Seteamos el user y el token con lo que nos devuelve la respuesta http
        this._user.set(resp.user);
        this._token.set(resp.token);

        //Guardamos el token en el localStorage (Application en inspeccionar)
        // para que no se pierda la info cuando recargue
        localStorage.setItem('token', resp.token);
      })
    )
  }

}
