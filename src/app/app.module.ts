import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StartupPage } from '../pages/startup/startup';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { PasswordRecoveryPage } from '../pages/password-recovery/password-recovery'; 
import { ResetPasswordPage } from '../pages/reset-password/reset-password'; 
import { EditAccountPage } from '../pages/edit-account/edit-account'; 
import { CreateNewOrderPage } from '../pages/create-new-order/create-new-order';
import { BuyWordsPage } from '../pages/buy-words/buy-words';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	StartupPage,
	LoginPage,
	CreateAccountPage,
	PasswordRecoveryPage,
	ResetPasswordPage,
	EditAccountPage,
	CreateNewOrderPage,
	BuyWordsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(FIREBASE_CONFIG),
	AngularFireDatabaseModule,
	AngularFirestoreModule,
	HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	StartupPage,
	LoginPage,
	CreateAccountPage,
	PasswordRecoveryPage,
	ResetPasswordPage,
	EditAccountPage,
	CreateNewOrderPage,
	BuyWordsPage,
  ],
  providers: [
    StatusBar,
	Facebook,
	Instagram,
	AngularFireAuth,
	GooglePlus,
	UserService,
	HTTP,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
