import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'githubUsers';

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    // this.apiService.getUsersOriginal().subscribe(console.log);
  }

}
