import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Loading, LoadingController, MenuController } from 'ionic-angular';
import { AngularFireAuthModule, AngularFireAuth, AngularFireAuthProvider, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { BookingPage } from '../booking/booking';
import { ResetPage } from '../reset/reset';
import { Events } from 'ionic-angular';
import { BookingRequestsPage } from '../booking-requests/booking-requests';
import { TrackerPage } from '../tracker/tracker';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Navbar) navBar: Navbar;
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;
  public itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  email: '';
  password: '';
  name = "";
  gender;
  hasSnapshot: any;
  hasOngoingTrip: boolean = false;
  pic;
  public ref: firebase.database.Reference = firebase.database().ref('Bookings');
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public navParams: NavParams,
    private afAuth: AngularFireAuth, public events: Events, private nativeStorage: NativeStorage, public menu:MenuController, public loading: LoadingController) {


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  public type = 'password';
  public showPass = false;


  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  setBackButtonAction() {
    // this.navBar.backButtonClick = () => {
    //   //Write here wherever you wanna do
    //   this.navCtrl.push(HomePage);
    //   this.navCtrl.setRoot(HomePage);
    // }
  }
  Reset() {
    this.navCtrl.push(ResetPage);
  }
  checkongoingtrip(){
    this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
      var obj = snap.val();
      if (obj.Driver == this.email.toLocaleLowerCase()) {
        this.hasOngoingTrip = true;
      }
    })
  }
  Login(){
    this.checkongoingtrip();
    let loader = this.loading.create({
      content: "Logging in..."
    });
    loader.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.email.trim().toLowerCase(), this.password).then((result)=>{
      let user =  this.afAuth.auth.currentUser;
      if(result){
        if(user.emailVerified){
          this.itemRef.orderByChild("Email").equalTo(this.email.trim().toLowerCase()).once('value', (snap) => {
            this.hasSnapshot = snap.exists();
            //is confirmed escort
              if(this.hasSnapshot){
                  //account exists, set all window storage variables
                  window.sessionStorage.setItem('Email', this.email.trim().toLowerCase());
                  snap.forEach(itemSnap => {
                    window.sessionStorage.setItem('Name', itemSnap.child("Name").val());
                    window.sessionStorage.setItem('Gender', itemSnap.child("Gender").val());
                    window.sessionStorage.setItem('Pic', itemSnap.child("Pic").val());
                    this.events.publish('profileInserted');
                    console.log("Event published");
                    return false;
                  });
                  
                  //method to check if there is an ongoing booking event
                 this.ref.orderByChild("Status").equalTo("Ongoing").on('child_added', (snap) => {
                  var obj = snap.val();
                  if (obj.Driver == this.email.trim().toLowerCase()) {
                    //has Ongoing Trip 
                    //this.hasOngoingTrip = true;
                    console.log("Has ongoing trip recorded");
                  }
                })
                //this.hasOngoingTrip = false;
                console.log(this.hasOngoingTrip);
                if(this.hasOngoingTrip){ 
                  let alert = this.alertCtrl.create({
                    title: 'Ongoing Trip Found',
                    message: 'Do you want to resume your trip?',
                    enableBackdropDismiss: false,
                    buttons: [
                      {
                        text: 'Cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                          this.navCtrl.setRoot(BookingRequestsPage);
                          this.navCtrl.popToRoot();
                          this.menu.swipeEnable(true);
                          loader.dismiss();
                          this.toastCtrl.create({
                            message: "Successfully logged in",
                            duration: 3000
                          }).present();
                        }
                      },
                      {
                        text: 'Yes',
                        handler: () => {
                          console.log('Yes clicked');
                          this.navCtrl.setRoot(TrackerPage);
                          this.events.publish('Track');
                          this.navCtrl.popToRoot();
                          this.menu.swipeEnable(true);
                          loader.dismiss();
                          this.toastCtrl.create({
                            message: "Successfully logged in",
                            duration: 3000
                          }).present();
                        }
                      }
                    ]
                  });
                  alert.present();
                }else{
                  this.navCtrl.setRoot(BookingRequestsPage);
                  this.navCtrl.popToRoot();
                  this.menu.swipeEnable(true);
                  loader.dismiss();
                  this.toastCtrl.create({
                    message: "Successfully logged in",
                    duration: 3000
                  }).present();
                }
              }else{
                //is not an escort
                let toast = this.toastCtrl.create({
                  message: "There is no user record corresponding to this identifier. The user may have been deleted.",
                  duration: 3000
                });
                loader.dismiss();
                toast.present();
              }
          });
        }else{
          //email not verified
          let toast = this.toastCtrl.create({
            message: "Email not verified. Please verify again.",
            duration: 3000
          });
          loader.dismiss();
          toast.present();
          user.sendEmailVerification();
        }
      }else{
        //no such record
        let toast = this.toastCtrl.create({
          message: "There is no user record corresponding to this identifier. The user may have been deleted.",
          duration: 3000
        });
        loader.dismiss();
        toast.present();
      }
    }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000
      });
      loader.dismiss();
      toast.present();
    }); 
  }
}
