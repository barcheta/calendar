export class CalEvent {
    constructor(public id: number | null, public title: string, public description: string, public holiday: boolean, public dateFrom: moment.Moment, public dateTo: moment.Moment) {
    }
}