import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

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
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewOrderPage');
  }
  
  backToDashboard(){
	    this.navCtrl.setRoot(HomePage);
  }
  getWordCount(newValue) {
	var s = newValue;
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	document.getElementById('wc-used').innerHTML = s.split(' ').length;
  } 
}
