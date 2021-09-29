import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options: string[] = ["kote", "kotiko", "konstantine"];
  searchVal;
  constructor() { }

  ngOnInit(): void {
  }

}
