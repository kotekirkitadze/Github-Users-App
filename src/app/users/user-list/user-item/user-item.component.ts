import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  @Output() emitValue = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  emit(userName: string) {
    this.emitValue.emit(userName);
  }

}
