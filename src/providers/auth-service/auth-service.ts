import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://plantappunsch.azurewebsites.net/api/plant';

@Injectable()
export class AuthService {
  options: any;
  constructor(public http: Http) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');
    this.options = new RequestOptions({ headers: headers });
  }
  auth(data, type) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + "/" + type, JSON.stringify(data), this.options).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getPlants() {
    return this.http.get(apiUrl)
      .map(res => res.json());
  }
  searchPlants(item) {
    return this.http.get(apiUrl + "/search/" + item)
      .map(res => res.json())
  }
  getPlant(Id) {
    return this.http.get(apiUrl + "/" + Id)
      .map(res => res.json())
  }
  getUsuario(Id) {
    return this.http.get(apiUrl + "/User/" + Id)
      .map(res => res.json())
  }
}
