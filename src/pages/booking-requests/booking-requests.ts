import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { SinglebookPage } from '../singlebook/singlebook';

/**
 * Generated class for the BookingRequestsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-requests',
  templateUrl: 'booking-requests.html',
})
export class BookingRequestsPage {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.itemsRef = afDatabase.list('Bookings');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingRequestsPage');
    this.loadEvents();
  }

  public events: any[] = [];
  noEventsLabel = "No Bookings Available";
  eventSource;
  itemsRef: AngularFireList<any>;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.
    loadEvents() {
      this.events = [];
        this.eventSource = this.createRandomEvents();
        var date = new Date();
        this.myCalendar.currentDate = date;
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        this.navCtrl.push(SinglebookPage, {
            key: event.key,
            Status: 'Pending',
            hasOverlap: event.hasOverlap
          });
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var scheduledEvents = [];
        //getting scheduled events 
        this.itemsRef.snapshotChanges().map(changes => {
            return changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
                    items.Status === 'Accepted' && items.Driver === window.sessionStorage.getItem('Email'));
        }).subscribe(time2 => { 
            scheduledEvents.length = 0;
            time2.map(r => { 
                var startTime = (new Date(r.Date + " " + r.startTime));
                var EndTime = (new Date(r.Date + " " + r.endTime));
                scheduledEvents.push({
                    startTime: startTime,
                    endTime: EndTime,
                    pickUp: r.Pickup,
                    destination: r.Destination,
                    allDay: false
                });
            });
        //getting booking events 
        this.itemsRef.snapshotChanges().map(changes => {

            return changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
                    items.Status === 'Pending' && items.EscortsGender === window.sessionStorage.getItem("Gender"));
        }).subscribe(time => {
            this.events.length = 0;

            time.map(r => {
                
                var startTime = (new Date(r.Date + " " + r.startTime));
                var EndTime = (new Date(r.Date + " " + r.endTime));
                var hasOverlap = false; 
                //condition one              
                for(var sEvent of scheduledEvents){
                    console.log(sEvent.startTime);
                console.log(sEvent.endTime);
                    var condition1 = (startTime > sEvent.startTime && startTime < sEvent.endTime);
                    var condition2 = (EndTime > sEvent.startTime && EndTime < sEvent.endTime);
                    if(condition1 || condition2){
                        hasOverlap = true;
                        console.log("Time overlap conflict detected on id "+r.key);
                    }else if(sEvent.startTime >= startTime && sEvent.endTime <= EndTime ){
                        hasOverlap = true;
                        console.log("Time overlap conflict detected on id "+r.key);
                    }
                }
                console.log(hasOverlap);

                if(r.Patient3Name){
                this.events.push({
                    title: r.PatientName + "," + r.Patient2Name + "," + r.Patient3Name,
                    key: r.key,
                    startTime: startTime,
                    endTime: EndTime,
                    pickUp: r.Pickup,
                    destination: r.Destination,
                    allDay: false,
                    hasOverlap: hasOverlap
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
                    allDay: false,
                    hasOverlap: hasOverlap
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
                    allDay: false,
                    hasOverlap: hasOverlap
                });
            }
                this.myCalendar.loadEvents();

            }

            );
            this.myCalendar.loadEvents();
            console.log(this.events);
            console.log(scheduledEvents);
        });

    });
        // var events = [];
        // for (var i = 0; i < 50; i += 1) {
        //     var date = new Date();
        //     var eventType = Math.floor(Math.random() * 2);
        //     var startDay = Math.floor(Math.random() * 90) - 45;
        //     var endDay = Math.floor(Math.random() * 2) + startDay;
        //     var startTime;
        //     var endTime;
        //     if (eventType === 0) {
        //         startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        //         if (endDay === startDay) {
        //             endDay += 1;
        //         }
        //         endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        //         events.push({
        //             title: 'All Day - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: true
        //         });
        //     } else {
        //         var startMinute = Math.floor(Math.random() * 24 * 60);
        //         var endMinute = Math.floor(Math.random() * 180) + startMinute;
        //         startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        //         endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        //         events.push({
        //             title: 'Event - ' + i,
        //             startTime: startTime,
        //             endTime: endTime,
        //             allDay: false
        //         });
        //     }
        // }
        // return events;

        return this.events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    }

}
