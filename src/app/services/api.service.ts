import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import {
  tap,
  map,
  switchMap,
  catchError
} from 'rxjs/operators';
import {
  UserApi,
  User,
  OrganizationAPi,
  RepositoryApi
} from '../models/model';

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
    return this.http.get<UserApi>(`${this.apiUrl}/${userName}`)
      .pipe(
        tap(d => console.log("uder data", d)),
        switchMap(data => {
          return this.makeApiRequest(data.organizations_url)
            .pipe(
              switchMap((firstOrgData: { url?: string }) => {
                return this.makeApiRequest(firstOrgData[0]?.url).pipe(
                  catchError(err => of(EMPTY)),
                  map((finalOrgData: OrganizationAPi) => {
                    return {
                      name: data.name,
                      pic_url: data.avatar_url,
                      userType: data.type,
                      email: data.email,
                      repos_url: data.repos_url,
                      public_repos: data.public_repos,
                      login: data.public_repos,
                      organization_name: finalOrgData.login,
                      organization_site: finalOrgData.html_url,
                      organization_picture: finalOrgData.avatar_url,
                      followers: data.followers,
                      created_at: data.created_at,
                      githubURL: data.html_url
                    }
                  })
                )
              })
            )
        }),
        switchMap(data => {
          return this.makeApiRequest(data.repos_url)
            .pipe(
              map((element: RepositoryApi[]) =>
                element.filter((_, i) => i <= 2).map(rep => {
                  return {
                    repo_name: rep.name,
                    repo_url: rep.html_url
                  }
                })),
              map(repoInfo => {
                return {
                  ...data,
                  repositoriesInfo: repoInfo
                }
              })
            )
        }),
        tap(d => console.log("hello", d))
      );
  }




  makeApiRequest(url: string) {
    return this.http.get<any>(url)
  }
}


