import {Injectable} from '@angular/core';
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
              private helper: EndpointSharedService) {
  }


  getAllPastExams(): Observable<endpointResponse> {
    return this.http.get<endpointResponse>(this.helper.getAPIRoute(this.historyRoutePath));
  }

  getExamFile(id: string): Observable<Blob> {
    return this.http.get<Blob>(this.helper.getAPIRoute(this.downloadRoutePath.replace(":exam", id)), {
      headers: {'Accept': 'application/pdf'},
      responseType: 'blob' as 'json'
    });
  }

  deletePastExam(id: string): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":exam", id)));
  }

  deleteAllPastExams(): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.deleteAllRoutePath));
  }
}
