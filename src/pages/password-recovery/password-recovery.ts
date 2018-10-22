import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import firebase from 'firebase';
/**
 * Generated class for the PasswordRecoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html',
})
export class PasswordRecoveryPage {
  email:string;
//var fb = firebase.database.ref();
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
			  private alertCtrl: AlertController) {
  }
  ionViewDidEnter(){
        this.menuCtrl.swipeEnable(false,"sidemenu");
  }
  ionViewWillLeave(){
        this.menuCtrl.swipeEnable(true,"sidemenu");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordRecoveryPage');
  }
  sendRecovery(){
    try{
      if(!this.email){
          const alert = this.alertCtrl.create({
          title: 'Info',
          subTitle: 'Please input your email.',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        firebase.auth().sendPasswordResetEmail(this.email)
        .then(() => {
			console.log("email sent");
			const alert = this.alertCtrl.create({
			  title: 'Info',
			  subTitle: 'We have sent the reset link, please check your email.',
			  buttons: ['OK']
			});
			alert.present();
			this.navCtrl.setRoot(LoginPage);
		})
      .catch((error) => { 
				console.log(error);
	  			const alert = this.alertCtrl.create({
			  title: 'Info',
			  subTitle: 'Invalid email!',
			  buttons: ['OK']
			});
			alert.present();
	  })
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
