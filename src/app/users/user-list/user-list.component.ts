import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  totalLength: any;
  page: number = 1;

  users: User[];

  changeMode(): void {
    this.mode = !this.mode;
  }

  ngOnInit(): void {
    this.getUsers().subscribe((d) => {
      this.users = d;
      console.log('hhh', d);
    });
  }

  toDetails(userName: string) {
    this.router.navigate(['users', userName]);
  }

  getUsers(): Observable<User[]> {
    return this.apiService
      .getUsers()
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
