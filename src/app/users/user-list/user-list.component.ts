import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  UserApi,
  User,
} from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  mode: boolean = true;
  config: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 8,
      totalItems: 50
    }
    route.queryParams.subscribe(
      params => {
        this.config.currentPage = params['page'] ? params['page'] : 1
        console.log("aaa", params['page'])
      }
    )
  }

  pageChange(newPage: number) {
    this.router.navigate(['users'], {
      queryParams: { page: newPage }
    }),

      this.getUsers(newPage).subscribe((d) => {
        this.users = d;
        console.log('hhh', d);
      });
  }

  // totalLength: any;
  // page: number = 1;

  users: User[];

  changeMode(): void {
    this.mode = !this.mode;
  }


  ngOnInit(): void {
    // this.getUsers().subscribe((d) => {
    //   this.users = d;
    //   console.log('hhh', d);
    // });

    this.pageChange(1)
  }

  toDetails(userName: string) {
    this.router.navigate(['users', userName]);
  }

  getUsers(data?): Observable<User[]> {
    return this.apiService
      .getUsers(data)
      .pipe(
        map((d) =>
          d.map<User>((data: UserApi) =>
            this.mapToUserList(data)
          )
        )
      );
  }

  mapToUserList(data) {
    return {
      name: data.name,
      email: data.email,
      pic_url: data.avatar_url,
      userType: data.type,
      repositories: data.public_repos,
      repos_url: data.repos_url,
      userName: data.login,
      repositoriesInfo: data.repo_info.map(
        (el) => {
          return {
            repo_name: el.name,
            repo_url: el.html_url,
          };
        }
      ),
    };
  }
}
