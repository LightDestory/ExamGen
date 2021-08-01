import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointResponse } from 'src/app/models/endpointResponse';
import { EndpointSharedService } from '../shared/endpoint-shared.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointSubjectsService {

  private getAllRoutePath: string = "api/subject";
  private paramRoutePath: string = "api/subject/:param";
  private deleteAllRoutePath: string = "api/question/all";

  constructor(private http: HttpClient,
    private helper: EndpointSharedService) { }
  

  getAllSubjects(): Observable<endpointResponse> {
    return this.http.get<endpointResponse>(this.helper.getAPIRoute(this.getAllRoutePath));
  }

  deleteAllSubjects(): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.deleteAllRoutePath));
  }

  deleteSubject(subjectName: string): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":param", subjectName)));
  }

  renameSubject(subjectName: string, newName: string): Observable<endpointResponse> {
    return this.http.put<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":param", subjectName)), { "name": newName });
  }
}
