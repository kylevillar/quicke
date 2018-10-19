import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import { PasswordRecoveryPage } from '../../pages/password-recovery/password-recovery';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { HomePage } from '../../pages/home/home';
import { Facebook } from '@ionic-native/facebook';
//import { Instagram } from '@ionic-native/instagram';
import { User } from '../../models/user';
//import { AngularFire } from '@angular/fire'; 
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import { Policies } from '../../policies/policies';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Policies]
})
export class LoginPage {
  user = {} as User;
  userProfile: any = null;
  email: string;
  password: string;
  userData: AngularFireList<User>;
  g_user: Observable<firebase.User>;
  constructor(public navCtrl: NavController, 
			  private alertCtrl: AlertController,
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
			  public policy: Policies,
			  public gplus: GooglePlus,
			  private db: AngularFireDatabase,
			  //private instagram: Instagram,
			  private fb: Facebook,
			  private afAuth: AngularFireAuth
			  ) {
			this.g_user = this.afAuth.authState;
			firebase.auth().onAuthStateChanged( user => {
						if (user){
						  this.userProfile = user;
						} else { 
						  this.userProfile = null; 
						}
					  });
			this.userData = this.db.list('user');
			  }
  async signUpWithFacebook(): Promise<void>{
	const alert = this.alertCtrl.create({
				  title: 'Facebook Privacy Policy',
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
								try {
									console.log(firebase.auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD);
								  const provider = new firebase.auth.FacebookAuthProvider();
								  const credential = firebase.auth()
									.signInWithPopup(provider)
									.then(function(data){
											// This gives you a Facebook Access Token. You can use it to access the Facebook API.
											//var token = data.credential.accessToken;
											// The signed-in user info.
											//var user = data.user;
									});
								} 
								catch (err) {
								  console.log(err);
								}
							
						}
					},
				  ]
				});
		alert.present();
  }
 async  signUpWithTwitter(): Promise<void>{
	  const alert = this.alertCtrl.create({
				  title: 'Twitter Privacy Policy',
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
								try {
								  const provider = new firebase.auth.TwitterAuthProvider();
								  const credential = this.afAuth.auth
									.signInWithPopup(provider)
									.then(data => {
									  const alert = this.alertCtrl.create({
										  title: 'Info',
										  subTitle: 'Sign In Successful!',
										  buttons: ['OK']
										});
										alert.present();
									  this.navCtrl.setRoot(HomePage);
									});
								} 
								catch (err) {
								  console.log(err);
								}
						}
					},
				  ]
				});
		alert.present();
  }
  async signUpWithInstagram(): Promise<void>{
	  const alert = this.alertCtrl.create({
				  title: 'Instagram Privacy Policy',
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
								
						}
					},
				  ]
				});
		alert.present();
  }
  async signUpWithGMail(): Promise<void>{
	  const alert = this.alertCtrl.create({
				  title: 'GMail Privacy Policy',
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
								try {
								  const provider = new firebase.auth.GoogleAuthProvider();
								  const credential = this.afAuth.auth
									.signInWithPopup(provider)
									.then(data => {
												this.userData.push({
													fullname: data.user.displayName,
													email: data.user.email,
													u_location: ""
												});
									  const alert = this.alertCtrl.create({
										  title: 'Info',
										  subTitle: 'Sign In Successful!',
										  buttons: ['OK']
										});
										alert.present();
									  this.navCtrl.setRoot(HomePage);
									});
								} 
								catch (err) {
								  console.log(err);
								} 
						}
					}
				]
		});
		alert.present();
  }
  
  ionViewDidEnter(){
        this.menuCtrl.swipeEnable(false,"sidemenu");
  }

  ionViewWillLeave(){
        this.menuCtrl.swipeEnable(true,"sidemenu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  async login(user: User){
	  try{
		  if(!this.email || !this.password){
			  	const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Please fill out the fields.',
				  buttons: ['OK']
				});
				alert.present();
		  }
		  else{ 
			const result = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
			.then(auth => {
				this.afAuth.auth.onAuthStateChanged(user => {
				    if (user && user.emailVerified) {
					  const alert = this.alertCtrl.create({
						  title: 'Info',
						  subTitle: 'Log in Successful!',
						  buttons: ['OK']
						});
						alert.present();
						this.navCtrl.setRoot(HomePage);
						user.reload;
						user.getIdToken(true);
				    }
				    else if(!user.emailVerified){
				    	const alert = this.alertCtrl.create({
						  title: 'Info',
						  subTitle: 'Log in Failed! Email not verified',
						  buttons: ['OK']
						});
						alert.present();
				    }
				  });
				
			})
		    .catch(err => {
				const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Log in Failed! Invalid credentials',
				  buttons: ['OK']
				});
				alert.present();
			});
		  }
	  }
	  catch (e) {
		  console.error(e);
	  }
  }
  

  recoverPassword(){
        this.navCtrl.push(PasswordRecoveryPage);
  }

  register(){
        this.navCtrl.push(CreateAccountPage);
  }
}
