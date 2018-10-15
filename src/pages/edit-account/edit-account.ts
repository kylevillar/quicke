import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth'; 
import * as firebase from 'firebase';

/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	  if (!user) {
			this.navCtrl.setRoot(LoginPage);
			unsubscribe();
	  } else {	  
			unsubscribe();
	  }
	});
  }
  ionViewWillEnter(){
	  this.menuCtrl.enable(true);
  }

}
