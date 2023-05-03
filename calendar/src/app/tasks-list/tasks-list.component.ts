import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalEvent } from '../cal-event.interface';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  @Input() calEvents: CalEvent[];
  @Input() close: boolean = false;
  @Output() closeChange = new EventEmitter<boolean>();
  @Output() selectedEvent = new EventEmitter<CalEvent>();
  public showCalEventEdit: boolean = false;
  public calEventEction: string = '';
  public calEvent: CalEvent;

  editEvent(calEvent: CalEvent) {
    this.selectedEvent.emit(calEvent)
  }

  public closeModal() {
    this.closeChange.emit(false);
  }

}
