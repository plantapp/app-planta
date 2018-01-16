import { AuthService } from './../../providers/auth-service/auth-service';
import { LocationPage } from './../location/location';
import { WelcomePage } from './../welcome/welcome';
import { PerfilPage } from './../perfil/perfil';
import { Common } from './../../providers/common/common';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, ModalController, Platform } from 'ionic-angular';


import { CamaraPage } from './../camara/camara';
import { DetallePlantaPage } from './../detalle-planta/detalle-planta';
import 'rxjs/add/observable/merge'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public plantas: any;
  public loader: any;
  model: PlantaValidator = { id: "", image: "", imageName: "", srcImage: "" };
  constructor(
    public common: Common
    , public navCtrl: NavController
    , private alertCtrl: AlertController
    , public camera: Camera
    , public service: AuthService
    , public loadingCtrl: LoadingController
    , public modalCtrl: ModalController
    , public platform: Platform
  ) {
    this.plantas = [];
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
  }
  ionViewDidLoad() {
    this.loader.present();
    this.service.getPlants().subscribe(
      data => {
        this.plantas = data;
      },
      error => {
        this.loader.dismiss();
        this.present("Error", "Connection failed");
      },
      () => { this.loader.dismiss(); });
  }
  present(title, msg) {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Aceptar']
    }).present();
  }

  openDetails(pId) {
    this.navCtrl.push(DetallePlantaPage, { Id: pId });
  }

  public openModal() {
    if (localStorage.getItem('AppId')) {
      let modal = this.modalCtrl.create(PerfilPage);
      modal.present();
    } else {
      let modal = this.modalCtrl.create(WelcomePage);
      modal.present();
    }
  }
  checkLocation() {
    let modal = this.modalCtrl.create(LocationPage);
    modal.present();
  }
  goToLocation(coordenadas) {
    let modal = this.modalCtrl.create(LocationPage, { ubicacion: coordenadas });
    modal.present();
  }
  search(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.service.searchPlants(val).subscribe(data => {
        this.plantas = data;
      }, error => {
        this.present("Error", "Connection failed");
      });
    } else {
      this.service.getPlants().subscribe(
        data => { this.plantas = data; },
        error => {
          this.present("Error", "Connection failed");
        });
    }
  }

  goToAdd() {
    this.getPicture();
  }
  goToAddGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit : true,         
      targetWidth: 300,
      targetHeight: 400,   
      quality: 100
    }).then((imageData) => {
      if (imageData) {
        this.model.image = `${imageData}`;
        this.model.srcImage = `data:image/jpeg;base64,${this.model.image}`;
        this.validar();
      }
    }, (err) => {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Imposible acceder a la galeria!',
        buttons: ['Aceptar']
      }).present();
    });
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 300,
      targetHeight: 400, 
      allowEdit : true,          
      quality: 100
    }
    this.camera.getPicture(options)
      .then(imageData => {
        if (imageData) {
          this.model.image = `${imageData}`;
          this.model.srcImage = `data:image/jpeg;base64,${this.model.image}`;
          this.validar();
        }
      })
      .catch(error => {
        this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Imposible acceder a la camara!',
          buttons: ['Aceptar']
        }).present();
      });
  }

  validar() {
    let loading = this.loadingCtrl.create({ content: 'Validando...' });
    if (this.model.image) {
      loading.present().then(() => {
        this.service.auth(this.model, "validate").then(data => {
          loading.dismiss();
          let result: any = data;
          if (result.status) {
            this.navCtrl.push(DetallePlantaPage, { Id: result.id });
          } else {
            this.navCtrl.push(CamaraPage, { image: this.model.srcImage, idata: this.model.image, name: result.imagenName });
          }
        }, (err) => {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Message',
            subTitle: 'Ocurrio error al validar la planta!',
            buttons: ['Aceptar']
          }).present();
        });
      });
    } else {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Sin Acceso al dispositivo!',
        buttons: ['Aceptar']
      }).present();
    }
  }

}

interface PlantaValidator {
  id: string;
  imageName: string;
  image: string;
  srcImage: string;
}
