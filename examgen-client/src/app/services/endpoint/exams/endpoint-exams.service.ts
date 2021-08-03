import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndpointSharedService} from "../shared/endpoint-shared.service";
import {Observable} from "rxjs";
import {endpointResponse} from "../../../models/endpointResponse";
import {Question} from "../../../models/question";

@Injectable({
  providedIn: 'root'
})
export class EndpointExamsService {

  private genericRoutePath: string = "api/exam";
  private historyRoutePath: string = "api/exam/history";
  private paramRoutePath: string = "api/exam/:exam";
  private downloadRoutePath: string = "api/exam/:exam/file";
  private deleteAllRoutePath: string = "api/exam/all";

  constructor(private http: HttpClient,
              private helper: EndpointSharedService) { }

  deleteAllPastExams(): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.deleteAllRoutePath));
  }
}
