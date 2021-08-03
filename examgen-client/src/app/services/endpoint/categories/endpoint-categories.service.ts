import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndpointSharedService} from "../shared/endpoint-shared.service";
import {Observable} from "rxjs";
import {endpointResponse} from "../../../models/endpointResponse";

@Injectable({
  providedIn: 'root'
})
export class EndpointCategoriesService {

  private getAllRoutePath: string = "api/subject/:subject/category";
  private paramRoutePath: string = "api/subject/:subject/category/:category";

  constructor(private http: HttpClient,
              private helper: EndpointSharedService) {
  }


  getAllCategoriesFromSubject(subject: string): Observable<endpointResponse> {
    return this.http.get<endpointResponse>(this.helper.getAPIRoute(this.getAllRoutePath.replace(":subject", subject)));
  }

  deleteCategoryFromSubject(subject: string, categoryName: string): Observable<endpointResponse> {
    return this.http.delete<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":subject", subject).replace(":category", categoryName)));
  }

  renameCategoryFromSubject(subject: string, categoryName: string, newName: string): Observable<endpointResponse> {
    return this.http.put<endpointResponse>(this.helper.getAPIRoute(this.paramRoutePath.replace(":subject", subject).replace(":category", categoryName)), {"name": newName});
  }
}
