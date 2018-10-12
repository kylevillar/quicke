import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
import { PreviewPage } from '../pages/preview/preview';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Instagram } from '@ionic-native/instagram';
import { AngularFireAuth } from '@angular/fire/auth'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartupPage;
  loggedIn = true;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
			  public statusBar: StatusBar, 
			  public splashScreen: SplashScreen,
			  public menuCtrl: MenuController,
			  public alertCtrl: AlertController,
			  private instagram: Instagram,
			  private afAuth: AngularFireAuth,
			  private fb: Facebook) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      /*{ title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }*/
	  { title: 'Dashboard', component: HomePage }
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  editAccount(){
	  this.nav.push(EditAccountPage);
	  this.menuCtrl.enable(false);
  }
  buyWords(){
	  this.nav.push(BuyWordsPage);
	  this.menuCtrl.enable(false);
  }
  signOut(){
	  const confirm = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure?',
      buttons: [
			{
			  text: 'No',
			  handler: () => {
				console.log('No');
			  }
			},
			{
			  text: 'Yes',
			  handler: () => {
				const result = this.afAuth.auth.signOut().then(function() {
				  // Sign-out successful.
				}, function(error) {
				  // An error happened.
				  console.log("error!");
				});	
				this.nav.push(StartupPage);
				  this.menuCtrl.enable(false);				
			  }
			}
		  ]
		});
		confirm.present();
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
