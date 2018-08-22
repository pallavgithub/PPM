import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class HttpService {

  //public baseurl: string = "http://192.168.3.29:1552/";
  //public baseurl: string = "http://localhost:61802/";
  constructor(private http: HttpClient) { }

  public httpGet(url: any) {
    //url = this.baseurl + url;

    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      })
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res))
      // Errors will call this callback instead:
      ,catchError((err) => this.handleError(err)));
  }

  public httpPost(url: any, object) {
    //url = this.baseurl + url;
    let body = JSON.stringify(object);

    let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      })
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res))
      // Errors will call this callback instead:
      ,catchError((err) => this.handleError(err)));
  }

  public httpPostWithoutAuth(url: any, object) {
    //url = this.baseurl + url;
    let body = JSON.stringify(object);

    let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' 
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res))
      // Errors will call this callback instead:
      ,catchError((err) => this.handleError(err)));
  }

  public httpPostForForgotPassword(url: any, object) {
    //url = this.baseurl + url;
    let body = JSON.stringify(object);

    return this.http.post(url, body, {
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res))
      // Errors will call this callback instead:
      ,catchError((err) => this.handleError(err)));
  }

  public httpPostWithFormData(url: any, object) {
    //url = this.baseurl + url;
    //let body = JSON.stringify(object);

    let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, object, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
      })
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res))
      // Errors will call this callback instead:
      ,catchError((err) => this.handleError(err)));
  }

  public httpPostForLogin(url: any, object: any) {
    //url = this.baseurl + url;
    var body = "grant_type=password&username=" + object.email + "&password=" + object.password;

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    })
      .pipe(map(res => this.ApiResponseOnSuccess(res)),
      catchError((err) => this.handleError(err)));
  }

  public ApiResponseOnSuccess(response) {
    return response;
  }

  public handleError(err) {
    return Observable.throw(err);
  }
}