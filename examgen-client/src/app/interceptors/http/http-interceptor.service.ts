import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs';
import {AuthStoreService} from 'src/app/services/vault/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authStore = this.injector.get(AuthStoreService);
    let authorized: HttpRequest<any> = authStore.API_KEY == null ? req : req.clone({
      setHeaders: {
        Authorization: authStore.API_KEY
      }
    });
    return next.handle(authorized);
  }
}
