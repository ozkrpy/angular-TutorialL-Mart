import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { sign } from 'fake-jwt-sign';
import * as decode from 'jwt-decode';

import {
  BehaviorSubject,
  Observable,
  of,
  throwError as observableThrowError
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Role } from './role.enum';

import { transformError } from '../common/common';
import { CacheService } from './cache.service';
export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

interface IServerAuthResponse {
  accessToken: string;
}

const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null
};
@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  );

  private readonly authProvider: (
    email: string,
    password: string
  ) => Observable<IServerAuthResponse>;

  private fakeAuthProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    if (!email.toLowerCase().endsWith('@test.com')) {
      return observableThrowError('Failed to login! email needs to end with @test.com');
    }
    const authStatus = {
      isAuthenticated: true,
      userId: 'e4d1bc2ab25c',
      userRole: email.toLowerCase().includes('cashier')
        ? Role.Cashier
        : email.toLowerCase().includes('clerk')
        ? Role.Clerk
        : email.toLowerCase().includes('manager')
        ? Role.Manager
        : Role.None
    } as IAuthStatus;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none'
      })
    } as IServerAuthResponse;
    return of(authResponse);
  }

  constructor(private httpClient: HttpClient) {
    // Fake login function to simulate roles
    super();
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
    this.authProvider = this.fakeAuthProvider;
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();
    const loginResponse = this.authProvider(email, password).pipe(
      map(value => {
        this.setToken(value.accessToken);
        return decode(value.accessToken) as IAuthStatus;
      }),
      catchError(transformError)
    );
    loginResponse.subscribe(
      res => {
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        return observableThrowError(err);
      }
    );
    return loginResponse;
  }

  logout() {
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'));
  }

  getToken(): string {
    return this.getItem('jwt') || '';
  }

  private clearToken() {
    this.removeItem('jwt');
  }
}
