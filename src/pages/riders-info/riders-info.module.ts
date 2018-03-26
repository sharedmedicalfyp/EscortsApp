import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RidersInfoPage } from './riders-info';

@NgModule({
  declarations: [
    RidersInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RidersInfoPage),
  ],
})
export class RidersInfoPageModule {}
