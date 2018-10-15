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
  loggedIn = false;
  userData = null;
  user = {} as User;
  userProfile: any = null;
  email: string;
  password: string;
  g_user: Observable<firebase.User>;
  constructor(public navCtrl: NavController, 
			  private alertCtrl: AlertController,
			  public navParams: NavParams,
			  public menuCtrl: MenuController,
			  public policy: Policies,
			  public gplus: GooglePlus,
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
			  }
  signUpWithFacebook(): Promise<any>{
	  //this.policy.displayFBPolicy();
	  /*this.fb.login(['public_profile', 'email'])
	.then((res: FacebookLoginResponse) => {
		this.fb.api('me?fields=id,name,email,first_name,picture.width(360).height(360).as(picture_medium)', []).then(profile => {
			this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_medium']['data']['url'], username: profile['name']};
			this.loggedIn = true;
			if(res.status === "connected"){
				const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Sign Up Successful!',
				  buttons: ['OK']
				});
				alert.present();
				console.log(res.status);
				this.navCtrl.setRoot(HomePage);
				
			}
			else{
				const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Sign Up Failed!',
				  buttons: ['OK']
				});
				alert.present();
				console.log(res.status);
			}
		})
  });*/
	return this.fb.login(['email'])
	.then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Login Successful: " + JSON.stringify(success)); 
          const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Sign Up Successful!',
				  buttons: ['OK']
				});
				alert.present();
				this.navCtrl.setRoot(HomePage);
        });

    }).catch((error) => { 
    	console.log(error);
    	const alert = this.alertCtrl.create({
				  title: 'Info',
				  subTitle: 'Sign Up Failed!',
				  buttons: ['OK']
				});
				alert.present();
    	
    });
  }
  signUpWithTwitter(){
	  this.policy.displayTWPolicy();
  }
  signUpWithInstagram(){
	  this.policy.displayIGPolicy();
  }
  signUpWithGMail(): void{
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
							    
								  /*this.gplus.login({
									  'webClientId':'1078026289343-hiqr2p7ojlcmtg8upnm1ppdo90i59cg4.apps.googleusercontent.com',
									  'offline':true
								  }).then(res => {
									  this.afAuth.auth.signInWithCredential(this.afAuth.auth.GoogleAuthProvider.credential(res.idToken))
									  .then(success =>{
										  const alert = this.alertCtrl.create({
											  title: 'Info',
											  subTitle: 'Google Sign In Successful!',
											  buttons: ['OK']
											});
											alert.present();
									  }).catch(err =>{
										  const alert = this.alertCtrl.create({
											  title: 'Info',
											  subTitle: 'Google Sign In Failed!',
											  buttons: ['OK']
											});
											alert.present();
									  })
								  });*/
								  /*try {
									const gplusUser = this.gplus.login({
									  'webClientId': '1078026289343-hiqr2p7ojlcmtg8upnm1ppdo90i59cg4.apps.googleusercontent.com',
									  'offline': true,
									  'scopes': 'profile email'
									})

									return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

								  } catch(err) {
									console.log(err)
								  }*/
						}
					},
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
  
  login(user: User){
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
