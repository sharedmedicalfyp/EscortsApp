import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar"
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { SinglebookPage } from '../singlebook/singlebook';
import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-my-schedule',
    templateUrl: 'my-schedule.html',
})
export class MySchedulePage {
    public itemRef: firebase.database.Reference = firebase.database().ref('Bookings');
    dates;
    speakers;
    day = [];
    events = [];

    items: Observable<any[]>;
    email = window.sessionStorage.getItem('Email');
    itemsRef: AngularFireList<any>;
    @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, afDatabase: AngularFireDatabase, public navParams: NavParams) {
        this.itemsRef = afDatabase.list('Bookings');
        



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MySchedulePage');
        this.loadEvents();
        var resolveDate;
        resolveDate = this.navParams.get('resolveDate');
        if(resolveDate){
            //notes 
           var conflictingDate = new Date();
            conflictingDate = (new Date(resolveDate + " " + "00:00"));
            this.myCalendar.currentDate = conflictingDate;
        }else{
            var date = new Date();
            this.myCalendar.currentDate = date;
        }
    }
    eventSource;
    viewTitle;
    isToday: boolean;
    arrayItems: Array<any> = [];
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

    loadEvents() {
        this.events = [];
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {

        this.navCtrl.push(SinglebookPage, {
            key: event.key,
            Status: 'Accepted'
        });

    }
    changeMode(mode) {
        this.calendar.mode = mode;

    }

    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        this.events.length = 0;
        this.itemsRef.snapshotChanges().map(changes => {

            return changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
                    items.Driver === this.email && items.Status === 'Accepted');
        }).subscribe(time => {
            this.events.length = 0;

            time.map(r => {

                var startTime = (new Date(r.Date + " " + r.startTime));
                var EndTime = (new Date(r.Date + " " + r.endTime));
                if(r.Patient3Name){
                this.events.push({
                    title: r.PatientName + "," + r.Patient2Name + "," + r.Patient3Name,
                    key: r.key,
                    startTime: startTime,
                    endTime: EndTime,
                    pickUp: r.Pickup,
                    destination: r.Destination,
                    allDay: false
                });
            }
              else if(r.Patient2Name){
                this.events.push({
                    title: r.PatientName + "," + r.Patient2Name ,
                    key: r.key,
                    startTime: startTime,
                    endTime: EndTime,
                    pickUp: r.Pickup,
                    destination: r.Destination,
                    allDay: false
                });
            }
            else{
                  this.events.push({
                    title: r.PatientName ,
                    key: r.key,
                    startTime: startTime,
                    endTime: EndTime,
                    pickUp: r.Pickup,
                    destination: r.Destination,
                    allDay: false
                });
            }
                this.myCalendar.loadEvents();

            }

            );
            this.myCalendar.loadEvents();
            console.log(this.events);
        });
        return this.events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
