import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the CreateNewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-new-order',
  templateUrl: 'create-new-order.html',
})
export class CreateNewOrderPage {
	public text:any={content: ''};
	public select: any;
  variety: string[] = ['- Please select -','American English','British English'];
  constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private alertCtrl: AlertController,
			  public menuCtrl: MenuController) {
					this.select = '- Please select -';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewOrderPage');
	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	  if (!user) {
			this.navCtrl.setRoot(LoginPage);
			unsubscribe();
	  } else {	  
			unsubscribe();
	  }
	});
  }
  getWordCount(newValue) {
		var s = newValue;
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/[ ]{2,}/gi," ");
		s = s.replace(/\n /,"\n");
		if(newValue === ""){
			document.getElementById('wc-used').innerHTML = "0";
		}
		else{
			document.getElementById('wc-used').innerHTML = s.split(' ').length;
		}
		console.log(this.text);
		console.log(this.select);
		console.log(!this.text);
		console.log(!this.select);
	}
	sendOrder(){
		
		const confirm = this.alertCtrl.create({
      title: 'Submit Order',
      message: 'Do you want to process your order now?',
      buttons: [
			{
			  text: 'No',
			  handler: () => {

			  }
			},
			{
			  text: 'Yes',
			  handler: () => {
					if(this.select == "- Please select -" || this.text == ""){
						const alert = this.alertCtrl.create({
							title: 'Info',
							subTitle: 'Please fill out the fields.',
							buttons: ['OK']
						});
						alert.present();
					}
					else{
						const alert = this.alertCtrl.create({
								title: 'Info',
								subTitle: 'Order has been submitted for review. We will notify you once our editors receive your order.',
								buttons: ['OK']
							});
							alert.present();
							this.navCtrl.setRoot(HomePage);
						}
					}
					
			}
		  ]
		});
		confirm.present();
	}
	
}
