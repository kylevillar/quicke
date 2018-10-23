import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, Platform } from 'ionic-angular';
import { PasswordRecoveryPage } from '../../pages/password-recovery/password-recovery';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { HomePage } from '../../pages/home/home';
//import { Instagram } from '@ionic-native/instagram';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'; 
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
//import { Facebook } from '@ionic-native/facebook';

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
})
export class LoginPage {
  user = {} as User;
  userProfile: any = null;
  email: string;
  password: string;
	userData: AngularFireList<User>;
	//usersRef: any = firebase.database().ref;
  constructor(public navCtrl: NavController, 
			  private alertCtrl: AlertController,
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
				private db: AngularFireDatabase,
				private gp: GooglePlus,
				private afAuth: AngularFireAuth,
				//private fb: Facebook,
			  //private instagram: Instagram,
			  ) {
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
								  /*const provider = new firebase.auth.FacebookAuthProvider();
								  firebase.auth()
									.signInWithPopup(provider)
									.then(data => {
										if(data.additionalUserInfo.isNewUser){
											this.userData.push({
												fullname: data.user.displayName,
												email: data.user.email,
												u_location: ""
											});
										}
											const alert = this.alertCtrl.create({
												title: 'Info',
												subTitle: 'Sign In Successful!',
												buttons: ['OK']
											});
											alert.present();
											this.navCtrl.setRoot(HomePage);
									}).catch(error => {
										console.log(error);
										const alert = this.alertCtrl.create({
											title: 'Info',
											subTitle: 'Email already exists!',
											buttons: ['OK']
										});
										alert.present();
									});*/
									this.nativeFBLogin();
								} 
								catch (err) {
									console.log(err);
									console.log('Error!');
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
								  firebase.auth()
									.signInWithPopup(provider)
									.then(data => {
										if(data.additionalUserInfo.isNewUser){
											this.userData.push({
												fullname: data.user.displayName,
												email: data.user.email,
												u_location: ""
											});
										}
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
  signUpWithGMail(){
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
									this.nativeGoogleLogin();
									/*const provider = new firebase.auth.GoogleAuthProvider();
									firebase.auth()
									.signInWithPopup(provider)
									.then(data => {
												if(data.additionalUserInfo.isNewUser){
													this.userData.push({
														fullname: data.user.displayName,
														email: data.user.email,
														u_location: ""
													});
											}
									  const alert = this.alertCtrl.create({
										  title: 'Info',
										  subTitle: 'Sign In Successful!',
										  buttons: ['OK']
										});
										alert.present();
									  this.navCtrl.setRoot(HomePage);
									}).catch(error => {
										console.log('error!');
										const alert = this.alertCtrl.create({
											title: 'Info',
											subTitle: 'Email already exists!',
											buttons: ['OK']
										});
										alert.present();
									});*/
								} 
								catch (err) {
									console.log(err);
									const alert = this.alertCtrl.create({
										title: 'Info',
										subTitle: 'Email already exists!',
										buttons: ['OK']
									});
									alert.present();
								} 
						}
					}
				]
		});
		alert.present();
	}
	
	async nativeGoogleLogin(): Promise<void> {
		try{
			const g_user = await this.gp.login({
				'webClientId': '1078026289343-hiqr2p7ojlcmtg8upnm1ppdo90i59cg4.apps.googleusercontent.com',
				'offline': true,
				'scopes': 'profile email'
			})
			const s_in = await this.afAuth.auth.signInWithCredential(
				firebase.auth.GoogleAuthProvider.credential(g_user.idToken)
			).then(data => {
					//console.log(data);
					//console.log(this.usersRef);
					if(data.displayName){
						this.userData.push({
							fullname: data.displayName,
							email: data.email,
							u_location: ""
						});
					}
					const alert = this.alertCtrl.create({
						title: 'Info',
						subTitle: 'Sign In Successful!',
						buttons: ['OK']
					});
					alert.present();
					this.navCtrl.setRoot(HomePage);
			})
			.catch(err => {
				console.log(err);
				const alert = this.alertCtrl.create({
					title: 'Info',
					subTitle: 'Email already exists!',
					buttons: ['OK']
				});
				alert.present();
			});
		}
		catch(err){
			console.log(err);
		}
	}

	async nativeFBLogin(): Promise<void> {
		try{
			/*return this.fb.login(['email','password'])
				.then( response => {
					const facebookCredential = firebase.auth.FacebookAuthProvider
						.credential(response.authResponse.accessToken);
					firebase.auth().signInWithCredential(facebookCredential)
						.then( success => { 
							console.log("Firebase success: " + JSON.stringify(success)); 
						});

				}).catch((error) => { console.log(error) });*/
		}
		catch(err){
			console.log(err);
		}
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
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(auth => {
					firebase.auth().onAuthStateChanged(user => {
							if (user && user.emailVerified) {
							const alert = this.alertCtrl.create({
								title: 'Info',
								subTitle: 'Log in Successful!',
								buttons: ['OK']
							});
							alert.present();
							this.navCtrl.setRoot(HomePage);
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
