import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

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
  }
  backToDashboard(){
	    this.navCtrl.setRoot(HomePage);
  }
  ionViewWillEnter(){
	  this.menuCtrl.enable(true);
  }

}
