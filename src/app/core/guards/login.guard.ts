import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { ContainerPathsEnum } from "../enums/container-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private readonly validateTokenUrl = environment.validateTokenUrl;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.checkLoginStatus();
  }

  private checkLoginStatus(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      return this.validateToken(token).pipe(
        map(isValid => {
          if (isValid) {
            this.navigateToDashboard();
            return false;  // Block access to login page
          }
          return true;  // Allow access to login page
        }),
        catchError(() => of(true))  // Allow access to login page in case of error
      );
    } else {
      return of(true);  // No token, allow access to login page
    }
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private navigateToDashboard(): void {
    window.location.href = '/' + ContainerPathsEnum.DASHBOARD;
  }

  private validateToken(accessToken: string): Observable<boolean> {
    return this.http.get<boolean>(this.validateTokenUrl, { params: { accessToken } }).pipe(
      map(response => response as boolean),
      catchError(() => of(false))  // Invalid token
    );
  }
}
