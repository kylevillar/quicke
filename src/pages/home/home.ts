import { Component } from '@angular/core';
import { NavController, MenuController} from 'ionic-angular';
import { CreateNewOrderPage } from '../../pages/create-new-order/create-new-order';
import { LoginPage } from '../../pages/login/login';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { Instagram } from '@ionic-native/instagram';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'; 
//import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
			  public menuCtrl: MenuController,
			  private afAuth: AngularFireAuth,
			  private toast: ToastController,
			  private fb: Facebook,
			  private afDB: AngularFireDatabase,
			  private userService: UserService) {	
  }
  createNewOrder(){
	  this.navCtrl.push(CreateNewOrderPage);
  }
  ionViewWillEnter() { 
  	this.menuCtrl.enable(true);
  }

}
