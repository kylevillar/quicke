import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { Instagram } from '@ionic-native/instagram';
import { AngularFireAuth } from '@angular/fire/auth'; 
import * as firebase from 'firebase';

/**
 * Generated class for the StartupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
})
export class StartupPage {
  rootPage: any;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController) {
  }

  ionViewDidEnter(){
        this.menuCtrl.swipeEnable(false,"sidemenu");
  }

  ionViewWillLeave(){
        this.menuCtrl.swipeEnable(true,"sidemenu");
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartupPage');
  }
  ngOnInit(){
				setTimeout(() => {
					//this.navCtrl.setRoot(LoginPage);
					const unsubscribe = firebase.auth().onAuthStateChanged(user => {
					  if (!user) {
						this.navCtrl.setRoot(LoginPage);
						unsubscribe();
						
					  } else {
						this.navCtrl.setRoot(HomePage);
						unsubscribe();
					  }
					});
				}, 5000);

  }


}
