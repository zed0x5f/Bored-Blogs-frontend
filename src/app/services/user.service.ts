import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Config } from '../config/config'
import { CookieService } from 'ngx-cookie-service';
import { share } from 'rxjs/operators';

/**
 * This will comunicate to the backend
 * signing component uses this to talk to backend
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  register(user: User) {
    const Observable = this.http.post(`${Config.apiUrl}/users/register`, user).pipe(share())
    Observable.subscribe((user: User) => {
      this.cookieService.set('token', user.token)
    });
    return Observable;
  }

  login(user: User) {
    const Observable = this.http.post(`${Config.apiUrl}/users/login`, user).pipe(share());
    Observable.subscribe((user: User) => {
      console.log(user);
      this.cookieService.set('token', user.token)
    });
    return Observable;
  }

  getUserFromLoacl() {
    //TODO: eat the cookie
  }
}