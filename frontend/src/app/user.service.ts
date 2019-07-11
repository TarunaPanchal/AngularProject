import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Url = environment.Url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getHeaderFormData() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    console.log('token', token);
    headers = headers.set('authorization', token);
    headers = headers.set('Accept', '*/*');
    return headers;
  }

  getHeader() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers = headers.set('authorization', token);
    headers = headers.set('Content-Type', 'application/json');
    console.log('headerrr', headers);
    return headers;
  }

  login(user: String, pass: String) {
    const loginData = { username: user, password: pass };
    return this.http.post(this.Url + '/login', JSON.stringify(loginData), this.httpOptions);
  }

  insertuser(user: any) {
    return this.http.post(this.Url + '/register', user);
  }
  updateUser(id, data) {
    return this.http.put(this.Url + '/update' + '/' + id, data , { headers: this.getHeaderFormData() });
  }
  userList() {
    return this.http.get( this.Url + '/allUser', { headers: this.getHeaderFormData() });
  }

  getData(id) {
       return this.http.get(this.Url + '/' + id , {  headers: this.getHeaderFormData() });
  }

  deleteUser(id) {
    return this.http.delete(this.Url + '/delete/' + id, { headers: this.getHeader() });
  }

  disableUser(id) {
    return this.http.put(this.Url + '/disable/' + id, {  });
  }

}
