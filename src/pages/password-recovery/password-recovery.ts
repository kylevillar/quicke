import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth'; 

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

  user = {} as User;
//var fb = firebase.database.ref();
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
        private afAuth:AngularFireAuth ) {
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
      if(!user.email){
          const alert = this.alertCtrl.create({
          title: 'Info',
          subTitle: 'Please input your email.',
          buttons: ['OK']
        });
        alert.present();
      }

      else{
        const reset = this.afAuth.auth.sendPasswordResetEmail(user.email)
        .then(user => { 
                  if(user){ 
                      this.afAuth.auth.onAuthStateChanged(user => {
                        if (user && user.emailVerified) {
                        const alert = this.alertCtrl.create({
                          title: 'Info',
                          subTitle: 'Login Successful!',
                          buttons: ['OK']
                        });
                        alert.present();
                        this.navCtrl.setRoot(HomePage);
                        user.reload;
                        user.getIdToken(true);
                        }
                        else{
                          const alert = this.alertCtrl.create({
                          title: 'Info',
                          subTitle: 'Email must be verified',
                          buttons: ['OK']
                        });
                        alert.present();
                        }
                      });
                 }
                 else{ 
                  const alert = this.alertCtrl.create({
                          title: 'Info',
                          subTitle: 'Invalid email!',
                          buttons: ['OK']
                        });
                        alert.present();
           } 
          },function(error){  
             console.log("Error Message:",error);
           });

      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
