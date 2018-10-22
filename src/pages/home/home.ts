import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { CreateNewOrderPage } from '../../pages/create-new-order/create-new-order';
import { LoginPage } from '../../pages/login/login';
//import { Instagram } from '@ionic-native/instagram';
import * as firebase from 'firebase'; 
import 'rxjs/add/operator/map';
import { PreviewPage } from '../preview/preview';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
			  public menuCtrl: MenuController) {	
  }
  createNewOrder(){
	  this.navCtrl.push(CreateNewOrderPage);
  }
  ionViewWillEnter() { 
  	this.menuCtrl.enable(true);
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
	view(){
		this.navCtrl.push(PreviewPage);
	}
}
