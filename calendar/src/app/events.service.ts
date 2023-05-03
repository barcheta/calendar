import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CalEvent } from './cal-event.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  public calEventEdit: Subject<CalEvent[]> = new Subject();
  private eventValue: Subject<string> = new Subject();
  public calEvents: CalEvent[] = [
    new CalEvent(1, 'Task 1', 'description 1', false, moment(), moment()),
    new CalEvent(2, 'Task 2', 'description 2', false, moment().set('hour', 10), moment().add(1, 'day').set('hour', 12)),
    new CalEvent(3, 'Task 3', 'description 3', true, moment().add(1, 'day').set('hour', 10), moment().add(1, 'day').set('hour', 16)),
    new CalEvent(4, 'Task 4', 'description 4', true, moment().add(1, 'day').set('hour', 10), moment().add(1, 'day').set('hour', 17)),
  ]

  constructor() {
    let calEvents = localStorage.getItem("calEvents");
    if (calEvents) {
      this.calEvents = JSON.parse(calEvents);
      for (let i = 0; i < this.calEvents.length; i++) {
        this.calEvents[i].dateFrom = moment(this.calEvents[i].dateFrom);
        this.calEvents[i].dateTo = moment(this.calEvents[i].dateTo);
      }
    }
  }

  public updateResidentValue(code: string): void {
    this.eventValue.next(code);
  }

  public getEvent() {
    return this.calEvents.slice(0);
  }

  public editEvent(calEvent: CalEvent) {
    const index = this.calEvents.findIndex(n => n.id === calEvent.id);
    if (index !== -1) {
      this.calEvents[index] = calEvent;
    }
    this.calEventEdit.next(this.calEvents.slice(0));
    localStorage.setItem("calEvents", JSON.stringify(this.calEvents));
  }

  public deleteEvent(calEvent: CalEvent) {
    const index = this.calEvents.findIndex(n => n.id === calEvent.id);
    if (index !== -1) {
      this.calEvents.splice(index, 1);
    }
    this.calEventEdit.next(this.calEvents.slice(0));
    localStorage.setItem("calEvents", JSON.stringify(this.calEvents));
  }

  public addEvent(calEvent: CalEvent) {
    calEvent.id = Number(this.calEvents[this.calEvents.length - 1].id) + 1;
    this.calEvents.push(Object.assign({}, calEvent));
    this.calEventEdit.next(this.calEvents.slice(0));
    localStorage.setItem("calEvents", JSON.stringify(this.calEvents));
  }

}
