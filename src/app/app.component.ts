import { Component, OnInit } from '@angular/core';
import {
  Router, Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { ApiService } from './services/api.service';
import { slideInAnimation } from './app.animation'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'githubUsers';
  loading = true;

  constructor(private apiService: ApiService,
    private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    })
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationError ||
      routerEvent instanceof NavigationCancel) {
      this.loading = false;
    }
  }

  ngOnInit() {
    // this.apiService.getUsersOriginal().subscribe(console.log);
  }

}
