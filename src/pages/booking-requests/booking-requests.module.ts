import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingRequestsPage } from './booking-requests';

@NgModule({
  declarations: [
    BookingRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingRequestsPage),
  ],
})
export class BookingRequestsPageModule {}
