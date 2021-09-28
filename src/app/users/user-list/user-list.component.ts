import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private apiService: ApiService,
    private router: Router) { }

  totalLength: any;
  page: number = 1;


  ngOnInit(): void {
    this.getUsers().subscribe(d => {
      this.users = d;
    })
  }

  users: User[];

  getUsers(): Observable<User[]> {
    return this.apiService.getUsers()
  }

  toDetails(userName: string) {
    this.router.navigate(['users', userName]);
  }
  //ეიპიდაიდან
  // getUsersOriginal(): Observable<User[]> {
  //   return this.apiService.getUsersOriginal()
  //     .pipe(
  //       tap(d => console.log(d)),
  //       map(d => d.map<User>((data: UserApi) => {
  //         return {
  //           name: data.name,
  //           email: data.email,
  //           pic_url: data.avatar_url,
  //           userType: data.type,
  //           repositories: data.public_repos,
  //           repos_url: data.repos_url,
  //           userName: data.login
  //         }
  //       }))
  //     )
  // }
}
