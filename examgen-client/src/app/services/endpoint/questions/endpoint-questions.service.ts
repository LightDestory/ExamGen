import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndpointSharedService} from "../shared/endpoint-shared.service";
import {Observable} from "rxjs";
import {endpointResponse} from "../../../models/endpointResponse";
import {Question} from "../../../models/question";

@Injectable({
  providedIn: 'root'
})
export class EndpointQuestionsService {

  private genericRoutePath: string = "api/question";
  private paramRoutePath: string = "api/question/:question";
  private deleteAllRoutePath: string = "api/question/all";

  constructor(private http: HttpClient,
              private helper: EndpointSharedService) {
  }


  getAllQuestions(): Observable<endpointResponse> {
    return this.http.get<endpointResponse>(this.helper.getAPIRoute(this.genericRoutePath));
  }

  createQuestions(question: Question): Observable<endpointResponse> {
    return this.http.post<endpointResponse>(this.helper.getAPIRoute(this.genericRoutePath), JSON.stringify(question), {headers: {'Content-Type': 'application/json'}});
  }

  updateQuestions(id: string, question: Question): Observable<endpointResponse> {
    return this.http.put<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":question", id)), JSON.stringify(question), {headers: {'Content-Type': 'application/json'}});
  }

  getQuestionDetails(question: string): Observable<endpointResponse> {
    return this.http.get<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":question", question)));
  }

  deleteQuestion(question: string): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":question", question)));
  }

  deleteAllQuestions(): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.deleteAllRoutePath));
  }
}
