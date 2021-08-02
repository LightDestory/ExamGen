import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndpointSharedService} from "../shared/endpoint-shared.service";
import {Observable} from "rxjs";
import {endpointResponse} from "../../../models/endpointResponse";

@Injectable({
  providedIn: 'root'
})
export class EndpointQuestionsService {

  private deleteAllRoutePath: string = "api/question/all";

  constructor(private http: HttpClient,
              private helper: EndpointSharedService) { }


  deleteAllQuestions(): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.deleteAllRoutePath));
  }
}
