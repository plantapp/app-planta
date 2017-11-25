import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ActionSheetController, ViewController, LoadingController, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  public loader: any;
  model: UsuarioModel = { id: "", nombres: "", userName: "", password: "", email: "", image: "", srcImage: "" };
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public platform: Platform
    , private alertCtrl: AlertController
    , public actionsheetCtrl: ActionSheetController
    , public camera: Camera
    , public loadingCtrl: LoadingController
    , public viewCtrl: ViewController
    , public appCtrl: App
    , public authService: AuthService) {
    this.loader = this.loadingCtrl.create({ content: 'Espere por favor...' });
  }

  ionViewDidLoad() {
  }
  signup() {
    if (this.model.image && this.model.userName && this.model.password && this.model.email && this.model.nombres) {
      this.loader.present();
      this.authService.auth(this.model, "signup").then((result) => {
        this.loader.dismiss();
        let response: any = result;
        if (response.id) {
          this.presentToast("Usuario Creado Correctamente");
          localStorage.setItem('AppId', response.id)
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().push(HomePage);
        } else {
          this.presentToast("Ocurrio error al crear el usuario");
        }
      }, (err) => {
        this.loader.dismiss();
        this.presentToast("Connection failed");
      });
    }
    else {
      this.presentToast("Ingrese todos los datos");
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
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Seleccione',
      cssClass: 'page-add-group',
      buttons: [
        {
          text: 'Camara',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.getCamera();
          }
        },
        {
          text: 'Galeria',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  getGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.model.image = `${imageData}`;
      this.model.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Imposible acceder a la galeria!',
        buttons: ['Aceptar']
      }).present();
    });
  }
  getCamera() {
    this.getPicture();
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
        this.model.image = `${imageData}`;
        this.model.srcImage = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Imposible acceder a la camara!',
          buttons: ['Aceptar']
        }).present();
      });
  }
}
interface UsuarioModel {
  id: string;
  nombres: string;
  userName: string;
  password: string;
  email: string;
  image: string;
  srcImage: string;
}
