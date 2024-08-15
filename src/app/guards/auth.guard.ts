import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { FullRoutesPathEnum } from "../core/enums/full-routes-path.enum";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private readonly validateTokenUrl = environment.validateTokenUrl;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  canActivateChild(): Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      return this.validateToken(token).pipe(
        catchError(() => {
          this.navigateToSignIn();
          return of(false);
        })
      );
    } else {
      this.navigateToSignIn();
      return of(false);
    }
  }

  private getToken(): string | null {
    const tokenUrlParam = this.router.routerState.snapshot.root.queryParamMap.get('accessToken');
    if (tokenUrlParam) {
      localStorage.setItem('token', tokenUrlParam);
      return tokenUrlParam;
    } else if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      this.navigateToSignIn();
      return null;
    }
  }

  private navigateToSignIn(): void {
    this.router.navigate([FullRoutesPathEnum.SIGN_IN]);
  }

  private validateToken(accessToken: string): Observable<boolean> {
    return this.http.get<boolean>(this.validateTokenUrl, { params: { accessToken } }).pipe(
      map(response => response as boolean),
      catchError(() => {
        this.navigateToSignIn();
        return of(false)
      })
    );
  }
}
