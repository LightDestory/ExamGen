import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndpointSharedService} from "../shared/endpoint-shared.service";
import {Observable} from "rxjs";
import {endpointResponse} from "../../../models/endpointResponse";
import {ExamRequest} from "../../../models/examRequest";

@Injectable({
  providedIn: 'root'
})
export class EndpointExamsService {

  private generateRoutePath: string = "api/exam/generate";
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

  generateExam(exam: ExamRequest): Observable<Blob> {
    return this.http.post<Blob>(this.helper.getAPIRoute(this.generateRoutePath), JSON.stringify(exam), {
      headers: {'Accept': 'application/pdf', 'Content-Type': 'application/json'},
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
