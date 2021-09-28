import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UserResolved } from "src/app/models/model";
import { ApiService } from "src/app/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserResolved> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UserResolved> {

    const id = route.paramMap.get("userName");
    if (!(isNaN(+id))) {
      const message = "User was not found";
      console.log(message)
      return of({ user: null, error: message })
    }

    return this.apiService.getUser(id)
      .pipe(
        map(user => ({ user: user })),
        catchError(error => {
          const message = `Retrieval error ${error}`;
          console.log(message);
          return of({ error: error, user: null })
        })
      );
  }
}
