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
			var query = firebase.database().ref('user').orderByChild('email').equalTo(user.email);
			query.on('child_added', function(snap) {
			  var person = snap.val();
			  /*document.getElementById("fname").value = person.fullname;
			  document.getElementById("email").value = person.email;
			  document.getElementById("location").value = person.u_location;*/
			});
			unsubscribe();
	  }
	});
  }
  
  updateUser(){
	  
  }
  
  ionViewWillEnter(){
	  this.menuCtrl.enable(true);
  }

}
