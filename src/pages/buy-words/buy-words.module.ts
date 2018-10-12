import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyWordsPage } from './buy-words';

@NgModule({
  declarations: [
    BuyWordsPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyWordsPage),
  ],
})
export class BuyWordsPageModule {}
