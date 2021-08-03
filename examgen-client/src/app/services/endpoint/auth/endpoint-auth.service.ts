import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {endpointResponse} from 'src/app/models/endpointResponse';
import {Observable} from 'rxjs';
import {EndpointSharedService} from '../shared/endpoint-shared.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointAuthService {

  private routePath: string = "api/ping";

  constructor(private http: HttpClient,
              private helper: EndpointSharedService) {
  }

  checkService(userData: string[]): Observable<endpointResponse> {
    return this.http.post<endpointResponse>(this.helper.getAPIRoute(this.routePath, userData[1]), null, {headers: {'Authorization': userData[0]}});
  }
}
