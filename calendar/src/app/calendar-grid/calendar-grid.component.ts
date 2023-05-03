import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { CalEvent } from '../cal-event.interface';
import { EventService } from '../events.service';

// export interface CalEvent {
//   id: number;
//   title: string;
//   description: string;
//   holiday: boolean;
//   dateFrom: moment.Moment;
//   dateTo: moment.Moment;
// }

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent {

  @Input() monthInView: moment.Moment = moment();
  @Input() chosenMonth: Array<moment.Moment> = [];
  public weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];
  public weekendDays: number[] = [6, 0];
  public showCalEventEdit: boolean = false;
  public calEventEction: string = '';
  public selectedDay: moment.Moment;
  public calEvent: CalEvent;

  constructor(private eventService: EventService) {

  }

  public getDay(monthDay: moment.Moment): number {
    return monthDay.date();
  }

  public getWeekend(monthDay: moment.Moment): number {
    return monthDay.day();
  }

  public isCurrentDay(monthDay: moment.Moment) {
    return moment().isSame(monthDay, 'day');
  }

  public isCurrentMonth(monthDay: moment.Moment) {
    return this.monthInView.isSame(monthDay, 'month');
  }

  public todayEvents(day: moment.Moment): CalEvent[] {
    let todaysEvents: CalEvent[] = this.eventService.getEvent().reduce(function (memo: any, ev) {
      let startDay = ev.dateFrom.clone().startOf('day').format('X');
      let endDay = ev.dateTo.clone().endOf('day').format('X');
      if (startDay <= day.clone().format('X') && endDay >= day.clone().format('X')) {
        memo.push(ev);
      }
      return memo;
    }, []);
    return todaysEvents;
  }

  public editTask(calEvent: CalEvent, eventCalEvent: string) {
    this.calEvent = Object.assign({}, calEvent);
    this.calEventEction = eventCalEvent;
    this.showCalEventEdit = true;
  }

  public addTask(selectedDay: moment.Moment, eventCalEvent: string) {
    this.calEvent = new CalEvent(null, '', '', false, selectedDay, selectedDay);
    this.selectedDay = selectedDay;
    this.calEventEction = eventCalEvent;
    this.showCalEventEdit = true;
  }


}
