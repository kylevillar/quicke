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
  
  email: string;
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
      if(!this.email){
          const alert = this.alertCtrl.create({
          title: 'Info',
          subTitle: 'Please input your email.',
          buttons: ['OK']
        });
        alert.present();
      }

      else{
        const reset = this.afAuth.auth.sendPasswordResetEmail(this.email)
        .then(auth => { 
                  if(reset){ 
                      this.navCtrl.push(ResetPage);     
                               this.toast.create({  
                                     'message':"Password reset email has been sent to your mail",          
                                      duration:5000,   
                                }).present();
                 }else{ 
                  console.log('Error while sending Reset link email'); 
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
