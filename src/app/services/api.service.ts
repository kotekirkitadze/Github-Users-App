import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserApi, User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "https://api.github.com/users";

  private jsonServer = "http://localhost:5000/data";

  constructor(private http: HttpClient) { }


  postInJson(data: any) {
    return this.http.post<any>(this.jsonServer, data);
  }


  //original and good code
  // getUsersOriginal(): Observable<UserApi[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(d => d.map(data => data.url)),
  //     switchMap(d => {
  //       return forkJoin(d.map(d => this.makeApiRequest(d)))
  //     })
  //   )
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonServer);
  }


  getUser(userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userName}`);
  }


  makeApiRequest(url: string) {
    return this.http.get<any>(url)
  }
}


