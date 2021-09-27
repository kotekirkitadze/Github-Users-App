import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserApi, User } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  totalLength: any;
  page: number = 1;
  myArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 6, 7, 8, 9, 10]

  ngOnInit(): void {
    this.getUsers().subscribe(d => {
      this.users = d;
      console.log(d);
    })
  }

  users: User[];

  getUsers(): Observable<User[]> {
    return this.apiService.getUsers()
      .pipe(
        map(d => d.map<User>((data: UserApi) => {
          return {
            name: data.name,
            email: data.email,
            pic_url: data.avatar_url,
            userType: data.type,
            repositories: data.public_repos,
            repos_url: data.repos_url
          }
        })),
        tap(d => console.log(d))
      )
  }
}
