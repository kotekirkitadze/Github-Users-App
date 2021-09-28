import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { UserApi, User, RepositoryApi } from '../models/model';

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


  getUsersOriginal(): Observable<UserApi[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(d => d.map(data => data.url)),
      switchMap(d => {
        return forkJoin(d.map(d => this.makeApiRequest(d)))
      }),
      switchMap((data: UserApi[]) => {
        return forkJoin(data.map((user: UserApi) => {
          return this.makeApiRequest(user.repos_url)
            .pipe(
              map(element => {
                return element.filter((_, i) => i <= 2);
              })
            )
        })).pipe(
          map((dataRepo) => {
            return data.map((el, i) => {
              return {
                ...el,
                repo_info: dataRepo[i]
              }
            })
          })
        )
      })
    )
  }

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


