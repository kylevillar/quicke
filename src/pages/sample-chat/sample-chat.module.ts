import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SampleChatPage } from './sample-chat';

@NgModule({
  declarations: [
    SampleChatPage,
  ],
  imports: [
    IonicPageModule.forChild(SampleChatPage),
  ],
})
export class SampleChatPageModule {}
