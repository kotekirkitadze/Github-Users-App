import {
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EMPTY,
  forkJoin,
  Observable,
  of,
} from 'rxjs';
import { map, switchMap, catchError, shareReplay } from 'rxjs/operators';
import {
  UserApi,
  OrganizationAPi,
  RepositoryApi,
} from '../models/model';

export const GITHUB_API =
  new InjectionToken<string>('github APi');

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject(GITHUB_API) private github_url: string
  ) { }

  getUsers(): Observable<UserApi[]> {
    return this.http
      .get<any[]>(this.github_url)
      .pipe(
        shareReplay(1),
        map((d) => d.map((data) => data.url)),
        switchMap((d) => {
          return forkJoin(
            d.map((d) => this.makeApiRequest(d))
          );
        }),
        switchMap((data: UserApi[]) => {
          return this.getReposInfo(data);
        }),
        shareReplay(1)
      );
  }

  getReposInfo(data: UserApi[]) {
    return forkJoin(
      data.map((user: UserApi) => {
        return this.makeApiRequest(
          user.repos_url
        ).pipe(
          map((element) => {
            return element.filter(
              (_, i) => i <= 2
            );
          })
        );
      })
    ).pipe(
      map((dataRepo) => {
        return data.map((el, i) => {
          return {
            ...el,
            repo_info: dataRepo[i],
          };
        });
      })
    );
  }



  //Single user
  getUser(userName: string): Observable<any> {
    return this.http
      .get<UserApi>(
        `${this.github_url}/${userName}`
      )
      .pipe(
        switchMap((data) => {
          return this.getOrganizationData(data);
        }),
        switchMap((data) => {
          return this.getSingleUserRep(data);
        })
      );
  }

  getOrganizationData(data) {
    return this.makeApiRequest(
      data.organizations_url
    ).pipe(
      switchMap(
        (firstOrgData: { url?: string }) => {
          return this.makeApiRequest(
            firstOrgData[0]?.url
          ).pipe(
            catchError(() => of(EMPTY)),
            map((finalOrgData: OrganizationAPi) =>
              this.mapToUser(data, finalOrgData)
            )
          );
        }
      )
    );
  }

  getSingleUserRep(data) {
    return this.makeApiRequest(
      data.repos_url
    ).pipe(
      map((element: RepositoryApi[]) =>
        element
          .filter((_, i) => i <= 2)
          .map((rep) => {
            return {
              repo_name: rep.name,
              repo_url: rep.html_url,
            };
          })
      ),
      map((repoInfo) => {
        return {
          ...data,
          repositoriesInfo: repoInfo,
        };
      })
    );
  }

  mapToUser(data, finalOrgData) {
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
      organization_picture:
        finalOrgData.avatar_url,
      followers: data.followers,
      created_at: data.created_at,
      githubURL: data.html_url,
    };
  }

  makeApiRequest(url: string) {
    return this.http.get<any>(url);
  }
}
