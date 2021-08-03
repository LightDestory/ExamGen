import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  API_KEY_ID: string = "api_key";
  ENDPOINT_ID: string = "endpoint";

  public get API_KEY(): string | null {
    return localStorage.getItem(this.API_KEY_ID);
  }

  public get endpoint(): string | null {
    return localStorage.getItem(this.ENDPOINT_ID);
  }

  private set API_KEY(token: string | null) {
    if (token !== null) {
      localStorage.setItem(this.API_KEY_ID, token);
    } else
      localStorage.removeItem(this.API_KEY_ID);
  }

  private set endpoint(url: string | null) {
    if (url !== null) {
      localStorage.setItem(this.ENDPOINT_ID, url);
    } else
      localStorage.removeItem(this.ENDPOINT_ID);
  }

  constructor(private router: Router) {
  }

  performLogin(userData: string[]): void {
    this.API_KEY = userData[0];
    this.endpoint = userData[1];
    this.router.navigate(['/']);
  }

  performLogOut(): void {
    this.API_KEY = null;
    this.endpoint = null;
    this.router.navigate(['/login']);
  }

  isDataValid(): boolean {
    if (this.API_KEY !== null && this.endpoint !== null) {
      return true;
    }
    return false;
  }
}
