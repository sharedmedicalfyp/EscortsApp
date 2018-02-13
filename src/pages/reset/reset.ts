import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuthModule, AngularFireAuth, AngularFireAuthProvider, AUTH_PROVIDERS } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  email;
  myForm: FormGroup;
  resetPassword(email: string) {
    try {

      this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email).then(() => {
        console.log("asd");
        let alert = this.alertCtrl.create({
          title: 'A link has been sent to reset your password!',
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss',

              handler: data => {
                this.navCtrl.push(LoginPage);


              }
            }
          ],
        });
        alert.present();
      }).catch((error) =>{
        // An error happened.
     
        let alert = this.alertCtrl.create({
          title: error.message,
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss',

      
            }
          ],
        });
        alert.present();
         this.myForm.get('email').setErrors({ Mismatch: true })
     
      });

    } catch (e) {
    console.log(e.message);
      let alert = this.alertCtrl.create({
          title: e.message,
          buttons: [
            {
              text: 'OK',
              cssClass: 'buttonOkCss',

      
            }
          ],
        });
        alert.present();
    }
  }
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public formBuilder: FormBuilder, public navParams: NavParams, private afAuth: AngularFireAuth) {
    this.myForm = formBuilder.group({

      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],






    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
