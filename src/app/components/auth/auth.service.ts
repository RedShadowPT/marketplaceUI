import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthToken } from '../../interfaces/AuthToken';
import { AuthData } from '../../interfaces/AuthData';
import { Subject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AuthService {
  private isAuthenticated = false;
  baseURL = environment.apiServerURL;
  private authStatusListner = new Subject<AuthToken>();
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private authUser: AuthToken;

  constructor(private http: HttpClient, private router: Router) { }

  getAuthUser() {
    return this.authUser;
  }

  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  isUserAdmin() {
    if (this.isAuthenticated) {
      return (this.authUser.isAdmin ? true : false);
    }
    return false;
  }

  createUser() { }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<AuthToken>(this.baseURL + '/api/v1/auth/login', authData)
      .subscribe(response => {
        this.authUser = response;
        const token = response.token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListner.next(this.authUser);
          this.router.navigate(['/admin']);
        }
      });
  }

  logout() {
    this.authUser = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(this.authUser);
    this.router.navigate(['/']);
  }
}
