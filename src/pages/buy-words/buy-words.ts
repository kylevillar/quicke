import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the BuyWordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-words',
  templateUrl: 'buy-words.html',
})
export class BuyWordsPage {
  
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public menuCtrl: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyWordsPage');
  }
  backToDashboard(){
	    this.navCtrl.setRoot(HomePage);
  }
  ionViewWillEnter(){
	  this.menuCtrl.enable(true);
  }
  
  selected(choice){
			var elem = document.getElementById('rate-wc-pre');
			var elem2 = document.getElementById('choice1');
			var elem3 = document.getElementById('rate-wc');
			var elem4 = document.getElementById('choice2');
			var elem5 = document.getElementById('tot-wc');
			var elem6 = document.getElementById('tot-wc-2');
		console.log(choice);
		if(choice == "pwcb"){
			elem.classList.add('hide');
			elem2.classList.add('hide');
			elem6.classList.add('hide');
			elem3.classList.remove('hide');
			elem4.classList.remove('hide');
			elem5.classList.remove('hide');
		}
		else if(choice == "ppwc"){
			elem.classList.remove('hide');
			elem2.classList.remove('hide');
			elem6.classList.remove('hide');
			elem3.classList.add('hide');
			elem4.classList.add('hide');
			elem5.classList.add('hide');
		}
  }
  
  setWordCount(newValue) {
	var v = parseInt(newValue); 
	var n = v;
	var i = document.getElementById('wc-now').innerHTML;
	var c = parseInt(i);
	var x = document.getElementById('wc-rate').innerHTML;
	var r = parseFloat(x);
	var totAmount = r*n;
	var totWC = n+c;
	document.getElementById('wc-total').innerHTML = String(totAmount);
	document.getElementById('wc-all').innerHTML = String(totWC);
	if(isNaN(parseInt(document.getElementById('wc-all').innerHTML))){
		document.getElementById('wc-all').innerHTML = i;
	}
	if(isNaN(parseInt(document.getElementById('wc-total').innerHTML))){
		document.getElementById('wc-total').innerHTML = '0';
	}
  } 
  
  setAmount(newValue) {
	var elem = document.getElementById('info-warning');
	var v = parseFloat(newValue);
    var wc = v/0.08;	
	var i = document.getElementById('wc-now').innerHTML;
	var c = parseInt(i);
	var totWC = wc+c;
	if(v<10){
		elem.classList.add('show');
	}
	if(v>=10){
		elem.classList.remove('show');
	}
	document.getElementById('wc-total-2').innerHTML = String(wc);
	document.getElementById('wc-all').innerHTML = String(totWC);
	if(isNaN(parseInt(document.getElementById('wc-all').innerHTML))){
		document.getElementById('wc-all').innerHTML = i;
	}
	if(isNaN(parseInt(document.getElementById('wc-total-2').innerHTML))){
		document.getElementById('wc-total-2').innerHTML = '0';
	}
  } 

}
