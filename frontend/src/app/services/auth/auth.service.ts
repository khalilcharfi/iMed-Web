import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public urlDomain = 'http://localhost:4000';
  public userID;
  public authToken: any;
  public user: any;
  constructor(
    private _http:HttpClient
  ) {
  }


  authenticateSignIn(user) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.urlDomain + '/users/authenticateSignIn', user, { });
    // return this._http.post(this.urlDomain + '/users/authenticateSignIn', user).map(res => res.json() )
      // .timeoutWith(6000, Observable.throw(new Error('Server connection timeout')))
  }

  getUserData() {
    const username = localStorage.getItem('user');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.urlDomain + '/users/getUserData/' + username, {});
  }
  storeData(token, user) {
    console.log(user)
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    // localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;

  }

  checkToken(){
    if(localStorage.getItem('token')) {
      return true
    } else{
      return false
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  getUserPayload() {
    var token = this.authToken;
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

// }
  // loggedIn() {
  //   return tokenNotExpired('token');
  // }


  // register(body:any){
  //   return this._http.post(this.urlDomain + '/users/addNewUser',body,{
  //     observe:'body',
  //     headers:new HttpHeaders().append('Content-Type','application/json')
  //   });
  // }

}
