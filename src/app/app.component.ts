import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RegistrationPage } from '../pages/registration/registration';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { BookingPage } from '../pages/booking/booking';
import { CropPage } from '../pages/crop/crop';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { ProfilePage } from '../pages/profile/profile';
import { SinglebookPage } from '../pages/singlebook/singlebook';
import { MenuController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { ReauthenticatePage } from '../pages/reauthenticate/reauthenticate';
import { SchedulePage } from '../pages/schedule/schedule';
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { FiltersPage } from '../pages/filters/filters';
import { ResetPage } from '../pages/reset/reset';
import { MobilePage } from '../pages/mobile/mobile';
import { RequestPage } from '../pages/request/request';
import { NgxPhoneSelectModule } from 'ngx-phone-select';
import { TextMaskModule } from 'angular2-text-mask';
import { HistoryPage } from '../pages/history/history';
import { CameraPage } from '../pages/camera/camera';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { App } from 'ionic-angular';
import { TrackerPage } from '../pages/tracker/tracker';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  rootPage: any = HomePage;
  imgsource;
  name;

  private currentUser: firebase.User;
  items: Observable<any[]>;
  activePage: any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any }>;
  constructor(platform: Platform, statusBar: StatusBar, public appCtrl: App, private nativeStorage: NativeStorage, public events: Events, private afAuth: AngularFireAuth, splashScreen: SplashScreen, private camera: Camera, public menuCtrl: MenuController) {
    this.events.subscribe('profileUpdated', () => {

      this.imgsource = window.localStorage.getItem('uImage')

    });
    this.events.subscribe('profileInserted', () => {
      console.log("hisdf");
      console.log(window.localStorage.getItem('Pic'));
      this.imgsource = window.localStorage.getItem('Pic');
      this.name = window.localStorage.getItem('Name');
    });
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      console.log(this.currentUser);
      this.afAuth.authState.subscribe(auth => {
        if (auth)
          this.rootPage = BookingPage;
        else
          console.log(auth);
        this.rootPage = HomePage;
      });
      this.pages = [
        { title: 'Profile', component: ProfilePage },
        { title: 'Bookings', component: BookingPage },
        { title: 'My Schedule', component: MySchedulePage },
        { title: 'History', component: HistoryPage },
        { title: 'Tracking', component: TrackerPage },
      ];
      this.activePage = this.pages[1];
    });
    //  var appData = window.localStorage.getItem('Email');
    //  var pic = window.localStorage.getItem('Pic');
    //   console.log(appData);
    //   this.itemRef.orderByChild("Email").equalTo(appData).once('value', (snap) => {


    //     snap.forEach(itemSnap => {

    //       this.imgsource = itemSnap.child("Pic").val() + new Date().getTime();
    //       this.name = itemSnap.child("Name").val()
    //       return false;

    //     });
    //     console.log(this.name);
    //     console.log(this.imgsource);
    //   });
  }

  openPage(page) {
    console.log(page);
    if (page.component) {
      this.nav.setRoot(page.component);
      this.activePage = page;
    }
    else {

      this.nav.setRoot(HomePage);
      this.activePage = this.pages[1];
    }
  }
  checkActive(page) {
    return page == this.activePage;
  }
  Logout() {
    this.menuCtrl.close();
    this.activePage = this.pages[1];

    window.localStorage.clear();
    window.localStorage.isMySessionActive = "false";

    console.log(window.localStorage.getItem('Email'));

    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      setTimeout(function () {
        window.location.reload();
      }, 500);

    }, function (error) {
      // An error happened.
      console.log(error);
    });
  }

}