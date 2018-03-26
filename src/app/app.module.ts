import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { RegistrationPage } from '../pages/registration/registration';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { SMS } from '@ionic-native/sms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { BookingPage } from '../pages/booking/booking';
import { ProfilePage } from '../pages/profile/profile';
import { SinglebookPage } from '../pages/singlebook/singlebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { ReauthenticatePage } from '../pages/reauthenticate/reauthenticate';
import { SchedulePage } from '../pages/schedule/schedule';
import { FiltersPage } from '../pages/filters/filters';
import { ResetPage } from '../pages/reset/reset';
import { MobilePage } from '../pages/mobile/mobile';
import { NgxPhoneSelectModule } from 'ngx-phone-select';
import { TextMaskModule } from 'angular2-text-mask';
import { RequestPage } from '../pages/request/request';
import { Calendar } from '@ionic-native/calendar';
import { AddEventPage } from '../pages/add-event/add-event';
import { CalendarModule } from "ion2-calendar";
import { MySchedulePage } from '../pages/my-schedule/my-schedule';
import { HistoryPage } from '../pages/history/history';
import { NgCalendarModule } from 'ionic2-calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { Crop } from '@ionic-native/crop';

import { ImageCropperModule } from 'ngx-image-cropper';
import { CropPage } from '../pages/crop/crop';
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { TrackerPage } from '../pages/tracker/tracker';
import { RidersInfoPage } from '../pages/riders-info/riders-info';
import { BookingRequestsPage } from '../pages/booking-requests/booking-requests';

export const firebaseConfig = {
  apiKey: "AIzaSyCFU9g3inPp81yQU14fYANC7vf31SpkqKk",
  authDomain: "sharedmedicalfyp-1cfcf.firebaseapp.com",
  databaseURL: "https://sharedmedicalfyp-1cfcf.firebaseio.com",
  projectId: "sharedmedicalfyp-1cfcf",
  storageBucket: "sharedmedicalfyp-1cfcf.appspot.com",
  messagingSenderId: "865840865908"
};


@NgModule({
  declarations: [
    MyApp,
    RegistrationPage,
    LoginPage,
    HomePage,
    BookingPage,
    ProfilePage,
    SinglebookPage,
    UpdateprofilePage,
    ReauthenticatePage,
    SchedulePage,
    FiltersPage,
    ResetPage,
    MobilePage,
    AddEventPage,
    RequestPage,
    MySchedulePage,
    HistoryPage,
    CameraPage,
    CropPage,
    TrackerPage,
    RidersInfoPage,
    BookingRequestsPage
  ],
  imports: [
    BrowserModule,
    TextMaskModule,
    CalendarModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,    // Valid options appear to be [true, false]
      autoFocusAssist: false,
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),

    ImageCropperModule,
    NgxPhoneSelectModule,
    NgCalendarModule,
 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
 
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrationPage,
    LoginPage,
    HomePage,
    BookingPage,
    ProfilePage,
    SinglebookPage,
    UpdateprofilePage,
    ReauthenticatePage,
    SchedulePage,
    FiltersPage,
    ResetPage,
    MobilePage,
    AddEventPage,
    RequestPage,
    MySchedulePage,
    HistoryPage,
    CameraPage,
    CropPage,
    TrackerPage,
    RidersInfoPage,
    BookingRequestsPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    File,
    NativeStorage,
    Transfer,
    Camera,
    Crop,
    FilePath,
    SMS,
    Events,
    AngularFireDatabaseModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    Device,
    NativeGeocoder,

  ]
})
export class AppModule { }
