import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    public authService: AuthService,
    private _http:HttpClient
  ) { }
  public urlDomain = this.authService.urlDomain;

  addUser(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.urlDomain + '/users/addUser', data, { });
  }

  addImageProfile(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.urlDomain + '/image/addImageProfile', data, { });
  }

  removeImageProfile(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.urlDomain + '/image/removeImageProfile', data, { });
  }

  getUsers() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.urlDomain + '/users/getUsers', { });
  }
  updateUser(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.urlDomain + '/users/updateUser', data, { });
  }
}
