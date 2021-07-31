import { Injectable } from '@angular/core';
import { AuthStoreService } from '../../vault/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointSharedService {

  constructor(private authStore: AuthStoreService ) { }

  getAPIRoute(routePath: string, unstored_endpoint?: string): string {
    let end_url = unstored_endpoint || this.authStore.endpoint
    return `${end_url}${routePath}`;
  }

  getGenericEndpointURL(url: string): string {
    return url[url.length-1] == '/' ? url : `${url}/`;
  }
}
