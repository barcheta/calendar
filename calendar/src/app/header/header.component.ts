import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() monthInView: moment.Moment = moment();;
  @Output() month: EventEmitter<any> = new EventEmitter<any>();
  @Output() weekMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  public weekModeSwith: boolean = false;

  setMonth(nav: string) {
    this.month.emit(nav);
  }

  weekModeChange() {
    this.weekModeSwith = !this.weekModeSwith
    this.weekMode.next(this.weekModeSwith)
  }

}
