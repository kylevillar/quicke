import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuyWordsPageModule } from '../pages/buy-words/buy-words.module';
import { CreateAccountPageModule } from '../pages/create-account/create-account.module';
import { EditAccountPageModule } from '../pages/edit-account/edit-account.module';
import { LoginPageModule } from '../pages/login/login.module';
import { PasswordRecoveryPageModule } from '../pages/password-recovery/password-recovery.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { StartupPageModule } from '../pages/startup/startup.module';
import { CreateNewOrderPageModule } from '../pages/create-new-order/create-new-order.module';
import { PreviewPageModule } from '../pages/preview/preview.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Facebook } from '@ionic-native/facebook';
import { Instagram } from '@ionic-native/instagram';
import { GooglePlus } from '@ionic-native/google-plus';
import { User } from '../models/user';
import { Policies } from '../policies/policies';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'; 
import { FIREBASE_CONFIG } from './app.firebase.config';
import * as firebase from 'firebase';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { PusherServiceProvider } from '../providers/pusher-service/pusher-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(FIREBASE_CONFIG),
	AngularFireDatabaseModule,
	AngularFirestoreModule,
	HttpClientModule,
	BuyWordsPageModule,
	CreateAccountPageModule,
	EditAccountPageModule,
	LoginPageModule,
	PasswordRecoveryPageModule,
	ResetPasswordPageModule,
	StartupPageModule,
	CreateNewOrderPageModule,
	PreviewPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
	//Facebook,
	Instagram,
	AngularFireAuth,
	GooglePlus,
	UserService,
	HTTP,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PusherServiceProvider,
    ChatServiceProvider
  ]
})
export class AppModule {}
