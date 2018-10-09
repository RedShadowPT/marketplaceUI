import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface
import { Node } from '../interfaces/Node';

@Injectable({
  providedIn: 'root'
})
export class NodesDataService {

  baseURL = environment.apiServerURL;

  constructor(private http: HttpClient) {
  }

  getNodesData(): Observable<any> {
    return this.http.get(this.baseURL + '/api/v1/nodes/');

  }

  getNodesGeoData(): Observable<any> {
    return this.http.get(this.baseURL + '/api/v1/nodes/geo');

  }

  constructGeoArray() {
    this.getNodesGeoData().subscribe(data => {
      console.log(data);
    });
  }
}
