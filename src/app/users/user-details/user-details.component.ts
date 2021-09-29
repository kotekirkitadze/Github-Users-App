import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserResolved, userWithOrganization } from '../../models/model'
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private route: Router) {

    this.activatedRoute.paramMap.subscribe(d => {
      this.data = this.activatedRoute.snapshot.data['userResolvedData'];
    })

  }

  userName: string;
  data: UserResolved;

  ngOnInit(): void {

    console.log(this.data)
  }

  get getUserData() {
    return this.apiService.getUser(this.userName);
  }

  // toOrgPage(url: string) {
  //   this.route.navigate([url])
  // }

}
