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
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {

  mapElement;
  map: any = null;
  items: Observable<any[]>;
  email;
  Address;
  postal;
  key;
  array = [];
  visible: boolean = true;
  value: boolean = false;
  markers = [];
  currentlocationmarker; 
  currentselectedoptionmarker;
  ref = firebase.database().ref('Bookings');
  itemsRef: AngularFireList<any>;
  public itemRef: firebase.database.Reference;

  dest;
  constructor(public navCtrl: NavController, private nativeGeocoder: NativeGeocoder,
    public platform: Platform, public alertCtrl: AlertController,
    private geolocation: Geolocation, afDatabase: AngularFireDatabase, public events: Events,
    private device: Device, private loading: LoadingController) {


    this.platform.ready().then(() => {
    });

    this.itemsRef = afDatabase.list('Bookings',
      ref => ref.orderByChild('startTime')
    );
    this.email = window.sessionStorage.getItem('Email');

    //method to check if there is an ongoing booking event
    this.items = this.itemsRef.snapshotChanges().map(changes => {

      return changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
          items.Driver === this.email && items.Status === 'Ongoing');
    });
    //if there are ongoing events
    this.items.subscribe(x => {
      this.array = x;
      console.log(this.array);
      if (this.array.length > 0) {
        this.visible = true;
        this.value = false; //toggles the display of map, False = ongoing trips found
        console.log(this.visible);
      }
      //if there are no ongoing booking events
      else {
        this.visible = false;
        this.value = true; //toggles the display of map, True = No ongoing trips found
        console.log(this.visible);
      }
    }
    );

  }
ionViewDidLoad(){ 
  let loader = this.loading.create({
    content: "Logging in..."
  });
  loader.present();
  this.mapElement = document.getElementById("map");
  this.mapElement.visible = true;
  setTimeout(()=>{   
    this.initMap();
  },1000);
  loader.dismiss();


}
ionViewWillLeave(){ 
  this.mapElement.visible = false;
  this.mapElement = null;
}
//shows destination marker on the map 
showDestinationMarker(){
  console.log("destination method fired");
    this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) =>{
      var obj = snap.val(); 
      if(obj.Driver == this.email){ 
          console.log(obj); //gets the ongoing record that we can use later for latlng mapping
          let markerCoord = new google.maps.LatLng(obj.Destinationlat, obj.Destinationlng);
          this.currentselectedoptionmarker.setPosition(markerCoord);
          // this.setCurrentSelectedOptionMarker(markerCoord, 'assets/imgs/black.png');
          // //this.deleteMarkers();
          // this.currentselectedoptionmarker.setMap(this.map);
          // this.currentlocationmarker.setMap(this.map);

      }
    });
    console.log(this.currentselectedoptionmarker); //marker is global variable
}
//shows pickup marker on the map
showPickupMarker(){ 
  console.log("pickupmarker method fired");
    this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) =>{
      var obj = snap.val(); 
      if(obj.Driver == this.email){ 
          console.log(obj); //gets the ongoing record that we can use later for latlng mapping
          let markerCoord = new google.maps.LatLng(obj.Pickuplat, obj.Pickuplng);
          this.currentselectedoptionmarker.setPosition(markerCoord);
          // this.setCurrentSelectedOptionMarker(markerCoord, 'assets/imgs/black.png');
          // //this.deleteMarkers();
          // this.currentselectedoptionmarker.setMap(this.map);
          // this.currentlocationmarker.setMap(this.map);
      }
    });
}


 initMap() {
  
    this.geolocation.getCurrentPosition().then((resp) => {
      //sets current location from GPS
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude); //current user's location based on GPS coords picked up by geolocation api
      this.map = new google.maps.Map(this.mapElement, {
        zoom: 15, //sets map zoom level
        center: mylocation //centers map to current user's location
      });
      this.setCurrentLocationMarker(mylocation, 'assets/imgs/blue.png');
      this.currentlocationmarker.setMap(this.map);
      //initializes and sets currentselectedoptionmarker
   this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
    var obj = snap.val();
    if (obj.Driver == this.email) {
      console.log(obj); //gets the ongoing record that we can use later for latlng mapping
      let markerCoord = new google.maps.LatLng(obj.Pickuplat, obj.Pickuplng);
      this.setCurrentSelectedOptionMarker(markerCoord, 'assets/imgs/black.png');
      this.currentselectedoptionmarker.setMap(this.map);
    }
  });
    });

    let watch = this.geolocation.watchPosition(); //called automatically whenever the device changes position, information taken from documentation
    //subscribe to watch data
    watch.subscribe((data) => {
      //clear all markers 
      //this.deleteMarkers();
      console.log(data);
      //get current device geocode location -> then method 
      this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => {

          this.dest = result.postalCode;
          this.itemsRef.snapshotChanges().map(changes => {
            return changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })).filter(items =>
                items.Driver === this.email && items.Status === 'Ongoing'); //checks for the record where the trip is ongoing and the driver is equals to the current user's email
          }).subscribe(time => {
            var schedules = [];

            schedules = time;
            console.log(schedules);
            
            //for loop to keep checking whether the user has reached the destination, could be done in another way like how Uber does it. 
            for (var i = 0; i < schedules.length; i++) {
              this.key = schedules[i].key;
              this.itemRef = firebase.database().ref('Bookings/' + this.key);
              this.Address = schedules[i].Destination;
              this.postal = this.Address.substr(this.Address.length - 6);
              console.log(this.dest);
              console.log(this.postal);
              if (this.dest === this.postal) {
                var alerted = localStorage.getItem('alerted') || '';
                if (alerted != 'yes') {
                  let alert = this.alertCtrl.create({
                    title: 'Destination Reached!',
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
                  localStorage.setItem('alerted', 'yes');
                }
              }
            }
          });

        })

        .catch((error: any) => console.log(error));
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      this.currentlocationmarker.setPosition(updatelocation);
      // let image = 'assets/imgs/blue.png';
      // this.setCurrentLocationMarker(updatelocation, image); //updates user location on the map
      // this.currentlocationmarker.setMap(this.map);
      // if(this.currentselectedoptionmarker){
      //   this.currentselectedoptionmarker.setMap(this.map);
      // }
    });
  }

  setCurrentLocationMarker(location, image){ 
    this.currentlocationmarker = new google.maps.Marker({ 
      position: location, 
      //map: this.map, 
      icon: image 
    });
  }
  setCurrentSelectedOptionMarker(location, image){ 
    this.currentselectedoptionmarker = new google.maps.Marker({ 
      position: location, 
      //map: this.map, 
      icon: image 
    });
  }



  // deleteMarkers() {
  //   if(this.currentlocationmarker){
  //   this.currentlocationmarker.setMap(null);
  //   }
  //   if(this.currentselectedoptionmarker){
  //   this.currentselectedoptionmarker.setMap(null);
  //   }
  // }

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





