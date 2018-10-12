import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Instagram } from '@ionic-native/instagram';

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

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
			  private fb:Facebook) {
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
					this.navCtrl.push(LoginPage);
				}, 5000);

  }

}
