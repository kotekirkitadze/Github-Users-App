import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() mode: boolean;
  @Output() emitValue =
    new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  emit(userName: string) {
    this.emitValue.emit(userName);
  }
}
