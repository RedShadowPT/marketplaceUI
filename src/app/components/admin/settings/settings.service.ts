import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class SettingsService {
  private baseURL = environment.apiServerURL;
  private settings = null;

  constructor(private http: HttpClient) { }

  getSettings(): Observable<any>  {
    return this.http.get(this.baseURL + '/api/v1/admin/config');
  }

  setSettings(values): Observable<any> {
    return this.http.post(this.baseURL + '/api/v1/admin/config', values);
  }
}
