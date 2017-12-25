import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
@IonicPage()
@Component({
  selector: 'page-reauthenticate',
  templateUrl: 'reauthenticate.html',
})
export class ReauthenticatePage {
  email: '';
  password: '';
  public key;
  appData;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public alertCtrl: AlertController) {
  }

  public itemRef: firebase.database.Reference = firebase.database().ref('Escorts');
  public itemsRef: firebase.database.Reference;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReauthenticatePage');

    //  this.appData = window.localStorage.getItem('email');

    this.appData = "tanyongting1234@gmail.com";
    this.itemRef.orderByChild("Email").equalTo(this.appData).once('value', (snap) => {
      this.key = Object.keys(snap.val());
      this.itemsRef = firebase.database().ref('Escorts/' + this.key);
      return false;
    });
  }
  CloseModal() {
    this.view.dismiss();
  }
  Confirm() {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      this.appData,
      this.password
    );
    user.reauthenticateWithCredential(cred).then(() => {
      user.delete().then(() => {
        var password = this.navParams.get('password');
        if (!password) {
          this.itemsRef.remove();
          let alert = this.alertCtrl.create({
            message: "User deleted.",
            buttons: [
              {
                text: 'OK',
                cssClass: 'buttonOkCss',

                handler: data => {
                  this.navCtrl.push(HomePage);
                  this.navCtrl.setRoot(HomePage);

                }
              }
            ],
          });
          alert.present();
        }
        else {
          user.updatePassword(password).then(() => {
            let alert = this.alertCtrl.create({
              message: "Password changed.",
              buttons: [
                {
                  text: 'OK',
                  cssClass: 'buttonOkCss',

                  handler: data => {
                    this.navCtrl.push(ProfilePage);
                    this.navCtrl.setRoot(ProfilePage);

                  }
                }
              ],
            });
            alert.present();
          }).catch(function (error) {

          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
}