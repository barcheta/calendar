import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalEvent } from '../cal-event.interface';
import * as moment from 'moment';
import { EventService } from '../events.service';

@Component({
  selector: 'calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent implements OnInit {

  @Input() chosenWeek: Array<moment.Moment> = [];
  @Input() chosenWeekGreed: any = [];
  @Input() weekInView: moment.Moment = moment();;
  public showCalEventEdit: boolean = false;
  public showListTasks: boolean = false;
  public ListTasks: [] = []
  public calEventEction: string = '';
  public calEvent: CalEvent;
  public selectedDay: moment.Moment;
  public weekDays = ['', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];
  public simpleEvents: any = [];
  public todaysEvents = [];

  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
    this.eventService.calEventEdit.subscribe(res => {
      this.getSimpleEvents();
    })
    this.getSimpleEvents();
  }

  public getSimpleEvents() {
    let simpleEvents: any[] = [];
    for (let i = 1; i < this.chosenWeek.length; i++) {
      let startDayOfWeek = this.chosenWeek[i].clone().startOf('day').format('X')
      let endDayOfWeek = this.chosenWeek[i].clone().endOf('day').format('X')
      simpleEvents[i] = [];
      this.eventService.getEvent().reduce(function (memo: any, ev) {
        let dateFrom = ev.dateFrom.clone().format('X');
        let dateTo = ev.dateTo.clone().format('X');
        if (dateFrom != dateTo || (!(startDayOfWeek <= dateFrom && endDayOfWeek >= dateTo))) return;
        simpleEvents[i].push(ev);
      }, []);
    }
    this.simpleEvents = simpleEvents;
    return this.simpleEvents;
  }

  public getEvent(day: any) {
    let todaysEvents = this.eventService.getEvent().reduce(function (memo: any, ev) {
      let startDay = ev.dateFrom.clone().format('X')
      let endDay = ev.dateTo.clone().format('X')
      if (startDay != endDay && startDay <= day.clone().format('X') && endDay >= day.format('X')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.todaysEvents = todaysEvents;
    return todaysEvents.length ? todaysEvents : null
  }

  public addTask(selectedDay: moment.Moment, eventCalEvent: string) {
    this.calEvent = new CalEvent(null, '', '', false, selectedDay, selectedDay)
    this.selectedDay = selectedDay;
    this.calEventEction = eventCalEvent;
    this.showCalEventEdit = true;
  }

  public editTask(calEvent: CalEvent, eventCalEvent: string) {
    this.calEvent = Object.assign({}, calEvent);
    this.calEventEction = eventCalEvent;
    this.showCalEventEdit = true;
  }

  public showListTasksF(ff: any) {
    this.showListTasks = true;
    this.ListTasks = ff;
  }

  editEvent(calEvent: CalEvent) {
    this.calEvent = calEvent;
    this.calEventEction = 'edit';
    this.showCalEventEdit = true;
    this.showListTasks = false;
  }

}
