import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public loader: any;
  model: UsuarioModel = { id: "", nombres: "", userName: "", password: "", email: "", image: "" };
  constructor(public navCtrl: NavController
    , public service: AuthService
    , public loadingCtrl: LoadingController
    , private alertCtrl: AlertController
    , public viewCtrl: ViewController) {
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
  }

  ionViewDidLoad() {
    if (localStorage.getItem('AppId')) {
      let Id = localStorage.getItem('AppId');
      this.loader.present();
      this.service.getUsuario(Id).subscribe(
        data => {         
          this.model = data;
        },
        error => {
          this.loader.dismiss();
          this.present("Message", "Connection failed");
        },
      ()=>{ this.loader.dismiss();});
    }
  }

  present(title, msg) {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Aceptar']
    }).present();
  }
  logout() {
    localStorage.removeItem("AppId");
    if (localStorage.getItem('AppId')) {
      this.present("Message", "Error Saliendo de sistema");
    }
    else {
      this.viewCtrl.dismiss();
    }
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