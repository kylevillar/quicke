import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewOrderPage } from './create-new-order';

@NgModule({
  declarations: [
    CreateNewOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewOrderPage),
  ],
})
export class CreateNewOrderPageModule {}
