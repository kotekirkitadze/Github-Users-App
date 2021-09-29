import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options: string[] = ["kote", "kotiko", "konstantine"];
  searchVal;

  faSearch = faSearch;
  constructor() { }

  ngOnInit(): void {
  }

}
