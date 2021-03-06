import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
//import { Instagram } from '@ionic-native/instagram';
import { User } from '../../models/user';
import * as firebase from 'firebase';


/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  user = {} as User;
  password:string;
  password2:string;
  u_location: string;
  userData: AngularFireList<User>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
			  public menuCtrl: MenuController,
			  public alertCtrl: AlertController,
			  private db: AngularFireDatabase) {
			  this.userData = this.db.list('user');
  }
  ionViewDidEnter(){
        this.menuCtrl.swipeEnable(false,"sidemenu");
  }

  ionViewWillLeave(){
        this.menuCtrl.swipeEnable(true,"sidemenu");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }
  async register(user: User){
	  try{
		  if(!user.fullname || !user.email || !this.password || !this.password2){
				const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Please fill out the required fields!',
				  buttons: ['OK']
				});
				alert.present();
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
			  const alert = this.alertCtrl.create({
				  title: 'Privacy Policy',
				  subTitle: 'Please read and agree with the rules and regulations.',
				  message: "<h3 class='par-head'>Heading 1</h3>" +
				  "<p class='par-txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>" + 
				  "<h3 class='par-head'>Heading 2</h3>" +
				  "<p class='par-txt'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>",
				  buttons: [
					{
						text:'Decline',
						handler: () => {
							
						}
					},
					{
						text:'Accept',
						handler: () => {
							firebase.auth().createUserWithEmailAndPassword(user.email, this.password)
							.then(auth => {

								this.userData.push({
									fullname: this.user.fullname,
									email: this.user.email,
									u_location: this.user.u_location
								});
								  const alert = this.alertCtrl.create({
								  title: 'Info',
								  subTitle: 'Sign Up Successful! We have sent the verification link to your email, please check.',
								  buttons: ['OK']
								});
								alert.present();
								let user = firebase.auth().currentUser;
 								user.sendEmailVerification();
								this.navCtrl.pop();
								this.user = {} as User;
							})
							.catch(err => {
								const alert = this.alertCtrl.create({
								  title: 'Info',
								  subTitle: 'Email already registered!',
								  buttons: ['OK']
								});
							  alert.present();
							});

							
							  
						}
					},
				  ]
				});
				alert.present();
		  }
	  }
	  catch (e){
		  console.error(e);
	  }
  }
}
