import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
declare var google: any;
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HistoryPage } from '../history/history';
import { Events } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataSnapshot } from '@firebase/database';
import { SchedulePage } from '../schedule/schedule';
import { MySchedulePage } from '../my-schedule/my-schedule';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SinglebookPage } from '../singlebook/singlebook';
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {
  watch;
  mapElement;
  map: any = null;
  email;
  key;
  visible: boolean = true;
  currentlocationmarker; 
  currentselectedoptionmarker;
  ref = firebase.database().ref('Bookings');
  public itemRef: firebase.database.Reference;
  selectedOption: boolean = true;
  informationArray = [];
  constructor(public navCtrl: NavController, private nativeGeocoder: NativeGeocoder,
    public platform: Platform, public alertCtrl: AlertController,
    private geolocation: Geolocation, private afDatabase: AngularFireDatabase, public events: Events,
    private device: Device, private loading: LoadingController, private diagnostic: Diagnostic) {}

  ionViewDidLeave() {
    if(this.watch){
    this.watch.unsubscribe();
    }
  }
  ionViewDidLoad() {
    console.log("ionviewdidload called");
    let successCallback = (isAvailable) => {
      if (isAvailable) {
        this.email = window.sessionStorage.getItem('Email');

        //method to check if there is an ongoing booking event
        this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
          var obj = snap.val();
          if (obj.Driver == this.email) {
            this.informationArray.push(obj);
            this.key = snap.key;
          }
        });
        //if there are ongoing events
        if (this.key) {
          this.visible = true;
          this.mapElement = document.getElementById("map");
          this.mapElement.visible = true;
          this.initMap();
        }
        //if there are no ongoing booking events
        else {
          this.visible = false;
          let alert = this.alertCtrl.create({
            title: 'You must start a trip first',
            buttons: [
              {
                text: 'OK',
                handler: data => {
                  this.events.publish('Schedule');
                  this.navCtrl.push(MySchedulePage);
                  this.navCtrl.setRoot(MySchedulePage).then(() => {
                    this.navCtrl.popToRoot();

                  });
                }
              }
            ],

          });
          alert.present();

        }
      } else {
        this.visible = false;
        let alert = this.alertCtrl.create({
          title: 'Please enable GPS and try again',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.events.publish('Schedule');
                this.navCtrl.push(MySchedulePage);
                this.navCtrl.setRoot(MySchedulePage).then(() => {
                  this.navCtrl.popToRoot();

                });
              }
            }
          ],

        });
        alert.present();
      }
    };
    let errorCallback = (e) => {
      console.log("Warning:This browser does not support cordova");
      this.email = window.sessionStorage.getItem('Email');

      //method to check if there is an ongoing booking event
      this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
        var obj = snap.val();
        if (obj.Driver == this.email) {
          this.informationArray.push(obj);
          this.key = snap.key;
        }
      });
      //if there are ongoing events
      if (this.key) {
        this.visible = true;
        this.mapElement = document.getElementById("map");
        this.mapElement.visible = true;
        this.initMap();
      }
      //if there are no ongoing booking events
      else {
        this.visible = false;
        let alert = this.alertCtrl.create({
          title: 'Information',
          message: 'You must start a trip first',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.events.publish('Schedule');
                this.navCtrl.push(MySchedulePage);
                this.navCtrl.setRoot(MySchedulePage).then(() => {
                  this.navCtrl.popToRoot();

                });
              }
            }
          ],

        });
        alert.present();

      }
    };
    //checking for permissions
    this.diagnostic.isLocationAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
      } else {
        this.visible = false;
        let alert = this.alertCtrl.create({
          title: 'App Permissions',
          message: 'Please enable the GPS permission for this application',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.diagnostic.requestRuntimePermissions([this.diagnostic.permission.ACCESS_COARSE_LOCATION, this.diagnostic.permission.ACCESS_FINE_LOCATION]);
                this.events.publish('Schedule');
                this.navCtrl.push(MySchedulePage);
                this.navCtrl.setRoot(MySchedulePage).then(() => {
                  this.navCtrl.popToRoot();


                });
              }
            }
          ],

        });
        alert.present();

      }
    }).catch(errorCallback);

    
    
  }
  endTrip() {
    this.itemRef = firebase.database().ref('Bookings/' + this.key);
    let alert = this.alertCtrl.create({
      title: 'Trip Completed!',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.itemRef.update({
              Status: "Completed",
              CompletedAt: firebase.database.ServerValue.TIMESTAMP,
            });
            localStorage.setItem('History', 'completed');
            this.events.publish('History');
            this.navCtrl.push(HistoryPage);
            this.navCtrl.setRoot(HistoryPage).then(() => {
              this.navCtrl.popToRoot();

            });
          }
        }
      ],

    });
    alert.present();
  
}
//shows destination marker on the map 
showDestinationMarker(){
  this.selectedOption = false;
  console.log("destination method fired");
    this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) =>{
      var obj = snap.val(); 
      if(obj.Driver == this.email){ 
          console.log(obj); //gets the ongoing record that we can use later for latlng mapping
          let markerCoord = new google.maps.LatLng(obj.Destinationlat, obj.Destinationlng);
          this.currentselectedoptionmarker.setPosition(markerCoord);
      }
    });
    console.log(this.currentselectedoptionmarker); //marker is global variable
}
//shows pickup marker on the map
showPickupMarker(){ 
  this.selectedOption = true;
  console.log("pickupmarker method fired");
    this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) =>{
      var obj = snap.val(); 
      if(obj.Driver == this.email){ 
          console.log(obj); //gets the ongoing record that we can use later for latlng mapping
          let markerCoord = new google.maps.LatLng(obj.Pickuplat, obj.Pickuplng);
          this.currentselectedoptionmarker.setPosition(markerCoord);
      }
    });
}

 initMap() {
   console.log("initmap fired");
    this.selectedOption = true;
    let loader = this.loading.create({
      content: "Loading"
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      //sets current location from GPS
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude); //current user's location based on GPS coords picked up by geolocation api
      this.map = new google.maps.Map(this.mapElement, {
        zoom: 12, //sets map zoom level
        center: mylocation,//centers map to current user's location
        disableDefaultUI: true
      });
      loader.dismiss();
      console.log("map loaded");
      google.maps.event.trigger(this.map, 'resize');
      this.setCurrentLocationMarker(mylocation, 'assets/imgs/car.png');
      this.currentlocationmarker.setMap(this.map);
      //initializes and sets currentselectedoptionmarker
   this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
    var obj = snap.val();
    if (obj.Driver == this.email) {
      console.log(obj); //gets the ongoing record that we can use later for latlng mapping
      let markerCoord = new google.maps.LatLng(obj.Pickuplat, obj.Pickuplng);
      this.setCurrentSelectedOptionMarker(markerCoord, 'assets/imgs/client.png');
      this.currentselectedoptionmarker.setMap(this.map);
    }
  });
    });
    var options = {
      enableHighAccuracy: true,
      frequency: 1,
    };
    this.watch = this.geolocation.watchPosition(options).subscribe((data) => {
      console.log(data);
      //get current device geocode location -> then method 
      // this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
      //   .then((result: NativeGeocoderReverseResult) => {

      //     this.dest = result.postalCode;
      //     this.itemsRef.snapshotChanges().map(changes => {
      //       return changes.map(c =>
      //         ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
      //           items.Driver === this.email && items.Status === 'Ongoing'); //checks for the record where the trip is ongoing and the driver is equals to the current user's email
      //     }).subscribe(time => {
      //       var schedules = [];

      //       schedules = time;
      //       console.log(schedules);
            
      //       //for loop to keep checking whether the user has reached the destination, could be done in another way like how Uber does it. 
      //       for (var i = 0; i < schedules.length; i++) {
      //         this.key = schedules[i].key;
      //         this.itemRef = firebase.database().ref('Bookings/' + this.key);
      //         this.Address = schedules[i].Destination;
      //         this.postal = this.Address.substr(this.Address.length - 6);
      //         console.log(this.dest);
      //         console.log(this.postal);
      //         if (this.dest === this.postal) {
      //           var alerted = localStorage.getItem('alerted') || '';
      //           if (alerted != 'yes') {
      //             let alert = this.alertCtrl.create({
      //               title: 'Destination Reached!',
      //               buttons: [
      //                 {
      //                   text: 'OK',
      //                   handler: data => {
      //                     this.itemRef.update({
      //                       Status: "Completed",
      //                       CompletedAt: firebase.database.ServerValue.TIMESTAMP,
      //                     });
      //                     localStorage.setItem('History', 'completed');
      //                     this.events.publish('History');
      //                     this.navCtrl.push(HistoryPage);
      //                     this.navCtrl.setRoot(HistoryPage).then(() => {
      //                       this.navCtrl.popToRoot();

      //                     });
      //                   }
      //                 }
      //               ],

      //             });
      //             alert.present();
      //             localStorage.setItem('alerted', 'yes');
      //           }
      //         }
      //       }
      //     });

      //   }).catch((error: any) => console.log(error));
      console.log(data.coords.latitude);
      if(data.coords.latitude && data.coords.longitude){
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      this.currentlocationmarker.setPosition(updatelocation);
      }
    },error => {
      console.log(error);
    });
  }
bookinginfo(){
  this.navCtrl.push(SinglebookPage, {
    key: this.key,
    Status: 'Ongoing'
  });
}
  setCurrentLocationMarker(location, image){ 
    this.currentlocationmarker = new google.maps.Marker({ 
      position: location, 
      icon: image 
    });
  }
  setCurrentSelectedOptionMarker(location, image){ 
    this.currentselectedoptionmarker = new google.maps.Marker({ 
      position: location, 
      icon: image 
    });
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};






