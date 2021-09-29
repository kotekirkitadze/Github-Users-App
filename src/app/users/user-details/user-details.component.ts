import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {
  userName: string;
  data: Observable<any>;

  private userSelectedSubject = new BehaviorSubject<number>(0);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(d => {
      this.userSelectedSubject.next(1);
      this.data = combineLatest([
        of(this.activatedRoute.snapshot.data['userResolvedData']),
        this.userSelectedAction$
      ]).pipe(
        map(([data, _]) => data)
      );
    })
  }

  ngOnInit(): void {
  }
}
