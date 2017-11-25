import { UsuarioPage } from './../usuario/usuario';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {    
  }

  ionViewDidLoad() {   
    
  }
  login() {
   this. closeModal();
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this. closeModal();
    this.navCtrl.push(UsuarioPage, {}, { animate: false });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

}
