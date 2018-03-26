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
  pic;
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

  async Login(){
    let loader = this.loading.create({
      content: "Logging in..."
    })
    loader.present();
    try{
    const result = await this.afAuth.auth.signInWithEmailAndPassword(this.email.toLowerCase(), this.password);
    let user = this.afAuth.auth.currentUser;
    if(result){
      if(user.emailVerified){
        this.itemRef.orderByChild("Email").equalTo(this.email.toLowerCase()).once('value', (snap) => {
          this.hasSnapshot = snap.exists();
            if(this.hasSnapshot){
                //account exists, set all window storage variables
                window.sessionStorage.setItem('Email', this.email.toLowerCase());
                snap.forEach(itemSnap => {
                  window.sessionStorage.setItem('Name', itemSnap.child("Name").val());
                  window.sessionStorage.setItem('Gender', itemSnap.child("Gender").val());
                  window.sessionStorage.setItem('Pic', itemSnap.child("Pic").val());
                  this.events.publish('profileInserted');
                  console.log("Event published");
                  return false;
                })
                this.navCtrl.setRoot(BookingRequestsPage);
                this.navCtrl.popToRoot();
                this.menu.swipeEnable(true);
                loader.dismiss();
                this.toastCtrl.create({
                  message: "Successfully logged in",
                  duration: 3000
                }).present();
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
  }catch(err){
    let toast = this.toastCtrl.create({
      message: err.message,
      duration: 3000
    });
    loader.dismiss();
    toast.present();
  }
  }
  // Login() {
  //   this.afAuth.auth.signInWithEmailAndPassword(this.email.toLowerCase(), this.password)
  //     .then(auth => {

  //       try {
  //         firebase.auth().onAuthStateChanged((user) => { //this is the line that is causing the polling issue
  //           console.log(user);
  //           if (user.emailVerified) {
  //             window.sessionStorage.setItem('Email', this.email.toLowerCase());
  //             console.log(window.sessionStorage.getItem('Email'));
  //             this.itemRef.orderByChild("Email").equalTo(this.email.toLowerCase()).once('value', (snap) => {
  //               this.hasSnapshot = snap.exists();
  //             });
  //             this.itemRef.orderByChild("Email").equalTo(this.email.toLowerCase()).once('value', (snap) => {
  //               console.log(snap.exists());
  //               console.log(snap.val());
  //               snap.forEach(itemSnap => {
  //                 this.name = itemSnap.child("Name").val();
  //                 console.log(this.name);

  //                 this.gender = itemSnap.child("Gender").val();
  //                 window.sessionStorage.setItem('Gender', this.gender);
  //                 this.pic = itemSnap.child('Pic').val();


  //                 return false;

  //               });

  //               window.sessionStorage.setItem('Name', this.name);
  //               console.log(this.name);
  //               console.log(window.sessionStorage.getItem('Name'));

  //               window.sessionStorage.setItem('Pic', this.pic);
  //               console.log(this.pic);
  //               console.log(window.sessionStorage.getItem('Pic'));
  //               this.events.publish('profileInserted');
  //             }),
  //             this.itemRef.orderByChild("Email").equalTo(this.email.toLowerCase()).once('value', (snap) => {
  //               this.hasSnapshot = snap.exists();
  //               if(this.hasSnapshot){
  //                // this.navCtrl.push(BookingPage);
  //                 this.navCtrl.setRoot(BookingRequestsPage);
  //                 this.navCtrl.popToRoot();

  //               }else{
  //                 let toast = this.toastCtrl.create({
  //                   message: "There is no user record corresponding to this identifier. The user may have been deleted.",
  //                   duration: 1000
  //                 });
  //                 toast.present();
  //               }
  //             });

  //           } else if (!user.emailVerified) {
  //             let alert = this.alertCtrl.create({
  //               message: "Email not verified. Please verify again.",
  //               buttons: [{ text: "Ok" }]
  //             });

  //             alert.present();
  //             user.sendEmailVerification();
  //           }

  //         });
  //       } catch (err) {
  //         let toast = this.toastCtrl.create({
  //           message: err.message,
  //           duration: 1000
  //         });
  //         toast.present();
  //       }
  //     })
  //     .catch(err => {
  //       let toast = this.toastCtrl.create({
  //         message: err.message,
  //         duration: 1000
  //       });
  //       toast.present();
  //     });

  // }
}
