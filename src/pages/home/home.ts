import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public diagnostic:Diagnostic) {
  }
  calendarPermissionCheck() {
    let errorCallback = (e) => {
      console.log("Warning:This browser does not support cordova");
    };
    //checking for permissions
    this.diagnostic.isCalendarAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        //does nothing and proceeds on with the application if the application has permissions turned on.
      } else {
        let alert = this.alertCtrl.create({
          title: 'App Permissions',
          message: 'Please enable the Calendar permission for this application',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.diagnostic.requestRuntimePermissions([this.diagnostic.permission.READ_CALENDAR, this.diagnostic.permission.WRITE_CALENDAR]).then(result => this.calendarPermissionCheck());
              }
            }
          ],

        });
        alert.present();

      }
    }).catch(errorCallback);
  }
  locationPermissionCheck() {
    let errorCallback = (e) => {
      console.log("Warning:This browser does not support cordova");
    };
    //checking for permissions
    this.diagnostic.isLocationAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        //does nothing and proceeds on with the application if the application has permissions turned on.
      } else {
        let alert = this.alertCtrl.create({
          title: 'App Permissions',
          message: 'Please enable the GPS permission for this application',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.diagnostic.requestRuntimePermissions([this.diagnostic.permission.ACCESS_COARSE_LOCATION, this.diagnostic.permission.ACCESS_FINE_LOCATION]).then(result => this.locationPermissionCheck());
              }
            }
          ],

        });
        alert.present();

      }
    }).catch(errorCallback);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.calendarPermissionCheck();
    this.locationPermissionCheck(); 
  }
  SignUp() {
    this.navCtrl.push(RegistrationPage);
  }
  Login() {
    this.navCtrl.push(LoginPage);
  }
}
