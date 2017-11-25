import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { LocationPage } from '../location/location';
@IonicPage()
@Component({
  selector: 'page-detalle-planta',
  templateUrl: 'detalle-planta.html'
})
export class DetallePlantaPage {

  item: any;
  planta: any;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public service: AuthService
    , private alertCtrl: AlertController
    , public loadingCtrl: LoadingController
    , public modalCtrl: ModalController) {
    this.item = this.navParams.get('Id');
  }


  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.service.getPlant(this.item).subscribe(data => {
      this.planta = data;
      loader.dismiss();
    },
      error => console.log(error)
    );
  }
  goToLocation(coordenadas) {
    let localizations: number[] = coordenadas.split(",");
    if (localizations.length == 2) {
      let latitude: number = Number(localizations[0]);
      let longitude: number = Number(localizations[1]);
      console.log("" + latitude + "," + localizations);
      if (latitude && longitude) {
        let modal = this.modalCtrl.create(LocationPage, { ubicacion: coordenadas });
        modal.present();
      } else {
        this.present();
      }
    }
    else {
      this.present();
    }
  }

  present() {
    this.alertCtrl.create({
      title: 'Message',
      subTitle: 'la localizacion no se reconoce como coordenadas!',
      buttons: ['Aceptar']
    }).present();
  }

}
