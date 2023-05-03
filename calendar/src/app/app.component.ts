import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalEvent } from './cal-event.interface';
import { EventService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public monthInView = moment();
  public weekInView = moment();
  public chosenMonth: Array<moment.Moment> = [];
  public chosenWeek: Array<moment.Moment> = [];
  public chosenWeekGreed: any[] = [];
  public totalDays: number = 42;
  public weekendDays: number[] = [6, 0];
  public weekMode: boolean = false;
  public calendar: Array<moment.Moment> = [];
  public currentWeek: any;
  public hoursItemsCount: number = 24;

  ngOnInit(): void {
    this.initCalendar(this.monthInView);
    this.initCalendarWeek(this.weekInView);
  }

  constructor(private eventService: EventService) {

  }

  public initCalendar(today: moment.Moment) {
    let startDay = today.clone().startOf('month').startOf('week');
    let endDay = today.endOf('month').startOf('week');
    this.chosenMonth = [];
    let day = today.clone();
    for (let index = 0; index < this.totalDays; index++) {
      this.chosenMonth.push(startDay.add(1, 'day').clone());
    }
    while (!day.isSame(endDay)) {
      this.calendar.push(day.clone());
      day.add(1, 'day');
    }
  }

  public initCalendarWeek(today: moment.Moment) {
    let startDay = today.clone().subtract(4, 'day');
    this.chosenWeek = [];
    for (let index = 0; index < 8; index++) {
      this.chosenWeek.push(startDay.add(1, 'day').clone());
    }
    for (let i = 0; i < 8; i++) {
      this.chosenWeekGreed[i] = [];
      for (let j = 0; j < this.hoursItemsCount; j++) {
        this.chosenWeekGreed[i][j] = this.weekInView.clone().startOf('week').add(i, 'day').set('hour', j);
      }
    }
  }

  public setMonth(event: string) {
    if (!this.weekMode) {
      switch (event) {
        case 'today':
          this.monthInView = moment();
          this.initCalendar(this.monthInView);
          break;
        case 'next':
          this.initCalendar(this.monthInView.add(1, 'month'));
          break;
        case 'prev':
          this.initCalendar(this.monthInView.subtract(1, 'month'));
          break;
      }
    } else {
      switch (event) {
        case 'today':
          this.weekInView = moment();
          this.initCalendarWeek(this.weekInView);
          break;
        case 'next':
          this.initCalendarWeek(this.weekInView.add(1, 'week'));
          break;
        case 'prev':
          this.initCalendarWeek(this.weekInView.subtract(1, 'week'));
          break;
      }
    }
  }
















  // actionWithEvent(event: {action: string, calEvent: CalEvent}) {
  //   switch (event.action) {
  //     case 'edit':
  //       this.editEvent(event.calEvent);
  //       break;
  //     case 'delete':
  //       this.deleteEvent(event.calEvent);
  //       break;
  //     case 'add':
  //       this.addEvent(event.calEvent);
  //       break;
  //   }
  // }

  // public editEvent(calEvent: CalEvent) {
  //   const index = this.eventService.getEvent().findIndex(n => n.id === calEvent.id);
  //   if (index !== -1) {
  //     this.eventService.getEvent()[index] = calEvent;
  //   }
  // }

  // public deleteEvent(calEvent: CalEvent) {
  //   const index = this.calEvents.findIndex(n => n.id === calEvent.id);
  //   if (index !== -1) {
  //     this.calEvents.splice(index, 1);
  //   }
  // }

  // public addEvent(calEvent: CalEvent) {
  //   calEvent.dateFrom = moment().add(1, 'day').set('hour', 10);
  //   calEvent.dateTo = moment().add(1, 'day').set('hour', 16);
  //   //let tt = this.calEvents[this.calEvents.length-1].id
  //   calEvent.id = Number(this.calEvents[this.calEvents.length-1].id) + 1;
  //   this.calEvents.push(Object.assign({}, calEvent)); 
  //  console.log(this.calEvents);
  // }





}
