import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, LoadingController, App } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  resposeData: any;
  public loader: any;
  model: UsuarioModel = { id: "", nombres: "", userName: "", password: "", email: "", image: "" };
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public loadingCtrl: LoadingController , public appCtrl: App,public authService: AuthService, public viewCtrl: ViewController) {
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
  }

  ionViewDidLoad() {
  }

  login() {
    if (this.model.userName && this.model.password) {
      this.loader.present();
      this.authService.auth(this.model, "login").then(result => {
        this.loader.dismiss();
        this.resposeData = result;
        if (this.resposeData.id) {
          localStorage.setItem('AppId', this.resposeData.id)
                  this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().push(HomePage);
        }
        else {
          this.presentToast("Usuario o contraseña incorrecta");
        }
      }, (err) => {
        this.loader.dismiss();
        this.presentToast("Connection failed");
      });
    }
    else {
      this.presentToast("Ingrese Usuario y contraseña");
    }
  }  
  presentToast(msg) {
    this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['Aceptar']
    }).present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
interface UsuarioModel {
  id: string;
  nombres: string;
  userName: string;
  password: string;
  email: string;
  image: string;
}