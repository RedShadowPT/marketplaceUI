import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class UsersService {
  private baseURL = environment.apiServerURL;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseURL + '/api/v1/admin/users');
  }

  createUser(userData): Observable<any> {
    return this.http.post(this.baseURL + '/api/v1/admin/users', userData);
  }

  deleteUser(userData): Observable<any> {
    return this.http.post(this.baseURL + '/api/v1/admin/users/delete', userData);
  }
}
