import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { User } from '../../models/user';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
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
			  public alertCtrl: AlertController,
			  private afAuth: AngularFireAuth) {
			this.userData = this.db.list('user');
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
			  let fname = person.fullname;
			  let email = person.email;
			  let u_location = person.u_location;
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
					var query = firebase.database().ref('user').orderByChild('email').equalTo(user.email);
					query.on('child_added', function(snap) {
					  var person = snap.val();
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
