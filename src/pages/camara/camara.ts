import { DetallePlantaPage } from './../detalle-planta/detalle-planta';
import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth-service/auth-service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {
  public loader: any;
  model: PlantaModel = {
    usuarioId: "", imagen: "", srcImagen: "", imagenName: "", nombre: "", reino: "", division: "", clase: "", subClase: "", orden: "",
    familia: "", subFamilia: "", tribu: "", genero: "", especie: "", descripcion: "", ubicacion: "", fecha: ""
  };
  plantaVal: PlantaValidator = { id: "", image: "", imageName: "", srcImage: "" };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public camera: Camera,
    public service: AuthService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
    if (navParams.get('idata')) {
      this.model.srcImagen = navParams.get('image');
      this.model.imagen = navParams.get('idata');
      this.model.imagenName = navParams.get('name');
    } else {
      this.getPicture();
    }
  }
  ionViewDidLoad() {
    this.getlocation();
    if (localStorage.getItem('AppId')) {
      this.model.usuarioId = localStorage.getItem('AppId');
    }
  }
  createPlanta() {
    if (this.model.imagen && this.model.nombre && this.model.clase && this.model.familia && this.model.genero && this.model.especie && this.model.descripcion && this.model.ubicacion) {
      this.loader.present();
      this.service.auth(this.model, "planta").then((result) => {
        this.loader.dismiss();
        let response: any = result;
        if (response.id) {          
          this.navCtrl.push(HomePage);
          this.present("Nueva Planta agregada correctamente");
        } else {
          this.present("Ocurrio error al crear el la planta");
        }
      }, (err) => {
        this.loader.dismiss();
        this.present("Connection failed");
      });
    }
    else {
      this.present("Ingrese todos los datos");
    }
  }

  getlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.model.ubicacion = resp.coords.latitude + "," + resp.coords.longitude;
    }).catch((error) => {
      this.present('Fallo al acceder a la localizacion!');
    });
  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      quality: 100
    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.plantaVal.image = `${imageData}`;
        this.plantaVal.srcImage = `data:image/jpeg;base64,${this.model.imagen}`;
        if (imageData) {
          this.validar();
        }
      })
      .catch(error => {
        this.present('Imposible acceder a la camara!');
      });
  }
  validar() {
    if (this.plantaVal.image) {
      this.loader.present();
      this.service.auth(this.plantaVal, "validate").then(data => {
        this.loader.dismiss();
        let result: any = data;
        if (result.status) {
          this.navCtrl.push(DetallePlantaPage, { Id: result.id });
        } else {
          this.model.imagenName = result.imagenName;
          this.model.srcImagen = this.plantaVal.srcImage;
          this.model.imagen = this.plantaVal.image;
        }
      }, (err) => {
        this.loader.dismiss();
        this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Ocurrio error al validar la planta!',
          buttons: ['Aceptar']
        }).present();
      });
    } else {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Sin Acceso al dispositivo!',
        buttons: ['Aceptar']
      }).present();
    }
  }
  present(msg) {
    this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['Aceptar']
    }).present();
  }
}
interface PlantaModel {
  usuarioId: string;
  imagen: string;
  srcImagen: string;
  imagenName: string;
  nombre: string;
  reino: string;
  division: string;
  clase: string;
  subClase: string;
  orden: string;
  familia: string;
  subFamilia: string;
  tribu: string;
  genero: string;
  especie: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
}

interface PlantaValidator {
  id: string;
  image: string;
  imageName: string;
  srcImage: string;
}
