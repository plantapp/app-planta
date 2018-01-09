import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DetallePlantaPage } from '../detalle-planta/detalle-planta';


@IonicPage()
@Component({
  selector: 'page-registros',
  templateUrl: 'registros.html',
})
export class RegistrosPage {
  public registros: any;
  public loader: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public service: AuthService) {
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
    this.registros=[];
  }

  ionViewDidLoad() {
    if (localStorage.getItem('AppId')) {
      let Id = localStorage.getItem('AppId');
      this.service.getRegistros(Id).subscribe(
        data => {
          this.registros = data;
        },
        error => {
          this.loader.dismiss();
          this.present("Error", "Connection failed");
        },
        () => { this.loader.dismiss(); });
    }else{
      this.present("Autenticacion", "Para Ver los registros necesitas logearte");
    }
  }

  viewPlanta(pId){
    this.navCtrl.push(DetallePlantaPage, { Id: pId });
  }

  present(title, msg) {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Aceptar']
    }).present();
  }
}
