import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { User } from '../../models/user';
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
  userInfo = {} as User;
  password:string;
  password2:string;
  u_location: string;
  userData: AngularFireList<User>;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
			  private db: AngularFireDatabase,
			  public alertCtrl: AlertController) {
			this.userData = this.db.list('user');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
		console.log(user);
		var ion_name = document.getElementById('fname').children;
		ion_name[0].setAttribute('value',user.displayName);
		var ion_email = document.getElementById('email').children;
		ion_email[0].setAttribute('value',user.email);
		var ion_location = document.getElementById('fname').children;
		var pic = document.getElementById('avatar-box');
			pic.setAttribute("style","background-image: url("+ user.photoURL +") !important;");
	  if (!user) {
			this.navCtrl.setRoot(LoginPage);
			unsubscribe();
	  } else {	
			var query = firebase.database().ref('user').orderByChild('email').equalTo(user.email);
			query.on('child_added', function(snap) {
				var person = snap.val();
				ion_location[0].setAttribute('value',person.u_location);
			unsubscribe();
			});
			unsubscribe();
	  }
	});
	}

  async updateUser(userInfo: User){
		  if(!this.password2 || !this.password){
			  if(!userInfo.fullname || !userInfo.email || !userInfo.u_location){
					const alert = this.alertCtrl.create({
					  title: 'Info',
					  subTitle: 'No changes in the data!',
					  buttons: ['OK']
					});
					alert.present();
			  }
		  }
		  else if(this.password2 != this.password){
				const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Passwords do not match!',
				  buttons: ['OK']
				});
				alert.present();
		  }
		  else{
			  const unsubscribe = firebase.auth().onAuthStateChanged(user => { 
				user.reload;
					var query = firebase.database().ref('user').orderByChild('email').equalTo(user.email);
					query.on('child_added', function(snap) {
					  this.userData.set({
						fullname: userInfo.fullname,
						email: userInfo.email,
						u_location: userInfo.u_location
					  });
					  const alert = this.alertCtrl.create({
					    title: 'Info',
					    subTitle: 'Update Successful!',
					    buttons: ['OK']
					  });
					  alert.present();
					});
				});
				unsubscribe();
			}
		}
	
  
  ionViewWillEnter(){
	  this.menuCtrl.enable(true);
  }

}
