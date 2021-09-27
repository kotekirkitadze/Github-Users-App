import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserApi } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "https://api.github.com/users"
  constructor(private http: HttpClient) { }

  // getUsers(): Observable<UserApi[]> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(d => d.map(data => data.url)),
  //     switchMap(d => {
  //       return forkJoin(d.map(d => this.makeApiRequest(d)))
  //     })
  //   )
  // }

  getUsers(): Observable<UserApi[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(d => d.map(data => data.url))
    )
  }

  makeApiRequest(url: string) {
    return this.http.get<any>(url)
  }
}



// getUsers(): Observable < UserApi[] > {
//   return this.http.get<any[]>(this.apiUrl).pipe(
//     map(d => d.map(data => data.url)),
//     switchMap(d => {
//       return forkJoin(d.map(d => this.makeApiRequest(d)))
//     }),
//     map(data => data.map<UserApi>(d => {
//       return {
//         name: d.name,
//         avatar_url: d.avatar_url,
//         type: d.type,
//         repos_url: d.repos_url,
//         public_repos: d.public_repos,
//         email: d.email
//       }
//     }))
//   )
// }
