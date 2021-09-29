import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchVal;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  faSearch = faSearch;

  lastThreeOptions: string[] = [];

  errorVal: string;

  constructor(private storage: StorageService,
    private apiService: ApiService,
    private route: Router) { }


  pushInStorage(name: string) {
    if (this.lastThreeOptions.length < 3) {
      this.lastThreeOptions.unshift(name);
      this.storage.set<string[]>(
        'lastThreeSearches',
        this.lastThreeOptions
      );
      return;
    }

    this.lastThreeOptions.splice(2, 1);
    this.lastThreeOptions.unshift(name);
    this.storage.set<string[]>(
      'lastThreeSearches',
      this.lastThreeOptions
    )
  }

  search() {
    let controlVal = this.myControl.value;
    if (!controlVal) {
      this.errorVal = "text required";
      return;
    }

    this.pushInStorage(controlVal)
    this.route.navigate(['/users', controlVal]);
    this.myControl.setValue('');
  }

  searchFromOption(value: string) {
    this.route.navigate(['/users', value]);
    this.myControl.setValue('');
  }

  searchUser(userName: string) {
    return this.apiService.getUser(userName);
  }

  restoreSearches() {
    const dataFromStorage = this.storage
      .get<string[]>('lastThreeSearches');
    if (dataFromStorage?.length > 0) {
      this.lastThreeOptions = dataFromStorage;
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )

    this.restoreSearches();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.lastThreeOptions.filter(option =>
      option.toLowerCase().includes(filterValue))
  }

}
