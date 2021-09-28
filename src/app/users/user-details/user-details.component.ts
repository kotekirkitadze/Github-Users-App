import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  userName: string;
  data: any;

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName');

    this.apiService.getUser(this.userName).subscribe(d => {
      this.data = d;
      console.log(d)
    })

  }

}
