import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-riders-info',
  templateUrl: 'riders-info.html',
})
export class RidersInfoPage {
paramData:any;
items:Array<any> = [];
patient2:any;
patient3:any;
itemref: any;
  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.paramData = this.navParams.get('item');
    if(this.paramData.Patient3ID){ 

      this.itemref = this.afDatabase.database.ref('FamilyProfile/'+this.paramData.Patient3ID);
      this.itemref.once("value", (snapshot) => {
      this.items.push(snapshot.val());
    });
    }
    if(this.paramData.Patient2ID){ 

      this.itemref = this.afDatabase.database.ref('FamilyProfile/'+this.paramData.Patient2ID);
      this.itemref.once("value", (snapshot) => {
      this.items.push(snapshot.val());
    });
    }
    if(this.paramData.PatientID){ 

      this.itemref = this.afDatabase.database.ref('FamilyProfile/'+this.paramData.PatientID);
      this.itemref.once("value", (snapshot) => {
      this.items.push(snapshot.val());
    });
    }
    console.log(this.items);
    
    
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad RidersInfoPage');
  }

}
