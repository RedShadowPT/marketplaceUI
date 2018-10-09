import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LogService {

  baseURL = environment.apiServerURL;

  constructor(private http: HttpClient) { }


}
