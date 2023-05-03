import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalEvent } from 'src/app/cal-event.interface';
import { EventService } from '../events.service';
import * as moment from 'moment';

@Component({
  selector: 'event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.scss']
})
export class EventEditModalComponent implements OnInit {

  @Input() calEvent: CalEvent;
  @Input() close: boolean = false;
  @Input() action: string = '';
  @Output() closeChange = new EventEmitter<boolean>();
  @Output() eventAction = new EventEmitter<{ action: string, calEvent: CalEvent }>();
  public hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  public editMode: boolean = false;
  public isHoliday: boolean = false;
  public eventForm: FormGroup = new FormGroup('');
  public dateFromPiker: any;
  public dateToPiker: any;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.editMode = this.action === 'edit'
    this.eventForm = new FormGroup({
      holiday: new FormControl(this.editMode ? this.calEvent.holiday : false),
      title: new FormControl(this.editMode ? this.calEvent.title : ''),
      description: new FormControl(this.editMode ? this.calEvent.description : ''),
      dateFromPiker: new FormControl(this.calEvent.dateFrom.format()),
      dateToPiker: new FormControl(this.calEvent.dateTo.format()),
      startHour: new FormControl(this.editMode ? this.calEvent.dateFrom.hour() : 0),
      endHour: new FormControl(this.editMode ? this.calEvent.dateTo.hour() : 0),
    });
  }

  public closeModal() {
    this.closeChange.emit(false);
  }

  public saveEvent() {
    this.calEvent.title = this.eventForm.value.title;
    this.calEvent.description = this.eventForm.value.description;
    this.calEvent.holiday = this.eventForm.value.holiday;
    this.calEvent.dateFrom = moment(this.eventForm.value.dateFromPiker).clone().set('hour', this.eventForm.value.startHour);
    this.calEvent.dateTo = moment(this.eventForm.value.dateToPiker).clone().set('hour', this.eventForm.value.endHour);

    if (this.editMode) {
      this.eventService.editEvent(this.calEvent);
    } else {
      this.eventService.addEvent(this.calEvent);
    }
    this.closeModal();
  }

  public deleteEvent() {
    this.eventService.deleteEvent(this.calEvent);
    this.closeModal();
  }

}
