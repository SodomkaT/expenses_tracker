import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private identityProviderUrl = environment.identityProviderUrl;

  constructor(
    private http: HttpClient,
  ) { }

  signIn(credentials: { email: string, password: string }) {
    return this.http.post(this.identityProviderUrl + '/signin', credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
        }
      })
    );
  }

  signUp(credentials: { email: string, password: string }) {
    return this.http.post(this.identityProviderUrl + '/signup', credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
        }
      })
    );
  }

  logout() {
    return this.http.post(this.identityProviderUrl + '/logout', null).pipe(
      tap((response: any) => {
        this.removeToken();
        this.removeRefreshToken();
        location.reload();
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(this.identityProviderUrl + '/refresh', null).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setRefreshToken(response.refresh_token);
        }
      })
    );
  }

  doesTokenExistInSession() {
    return !!sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  setRefreshToken(refreshToken: string) {
    sessionStorage.setItem('refreshToken', refreshToken);
  }

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  removeRefreshToken() {
    sessionStorage.removeItem('refreshToken');
  }

}
