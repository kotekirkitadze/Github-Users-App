import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

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

  lastThree: string[] = [];
  options: string[] = this.lastThree;

  errorVal: string;

  constructor(private storage: StorageService) { }


  pushInStorage(name: string) {
    if (this.lastThree.length < 3) {
      this.lastThree.unshift(name);
      this.storage.set<string[]>(
        'lastThreeSearches',
        this.lastThree
      );
      return;
    }

    this.lastThree.splice(2, 1);
    this.lastThree.unshift(name);
    this.storage.set<string[]>(
      'lastThreeSearches',
      this.lastThree
    )
  }

  search() {
    let controlVal = this.myControl.value;
    if (!controlVal) {
      this.errorVal = "text required";
      return;
    }

    this.pushInStorage(controlVal)
    this.options = this.lastThree;

    console.log(this.lastThree)
  }

  restoreSearches() {
    const dataFromStorage = this.storage
      .get<string[]>('lastThreeSearches');
    if (dataFromStorage?.length > 0) {
      this.lastThree = dataFromStorage;
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
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue))
  }

}
