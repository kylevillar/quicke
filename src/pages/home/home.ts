import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { CreateNewOrderPage } from '../../pages/create-new-order/create-new-order';
import { LoginPage } from '../../pages/login/login';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Instagram } from '@ionic-native/instagram';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { ToastController } from 'ionic-angular';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  userList: Observable<User[]>;
  
  constructor(public navCtrl: NavController,
			  public menuCtrl: MenuController,
			  private instagram: Instagram,
			  private afAuth: AngularFireAuth,
			  private toast: ToastController,
			  private fb: Facebook,
			  private userService: UserService) {	

			/*this.userList = this.userService.getUserList()
		  .snapshotChanges()
		  .map(
		  changes => {
			return changes.map(c => ({
			  key: c.payload.key, ...c.payload.val()
			}))
		  });*/
  }
  createNewOrder(){
	  this.navCtrl.push(CreateNewOrderPage);
  }
  ionViewWillEnter() { 
  	this.menuCtrl.enable(true);
  }
  /*ionViewWillLoad() { 
  	this.afAuth.authState.subscribe(data => {
		if(data.email && data.uid){
			this.toast.create({
				message: 'Welcome to Quick-E, ' + data.email + '!',
				duration: 3000
			}).present();
		}
		else{
			this.toast.create({
				message: 'Sorry, could not find authentication details.',
				duration: 3000
			}).present();
		}
	});
  }
  display(){
	  this.userCollection = this.afs.collection('user'); //ref()
	  this.users = this.userCollection.valueChanges()
  }*/
}
