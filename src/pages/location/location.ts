import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { IonicPage, NavController, ViewController, AlertController, NavParams } from 'ionic-angular';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  coordenadas: any;
  @ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController
    , private alertCtrl: AlertController
    , public viewCtrl: ViewController
    , public geolocation: Geolocation
    , public navParams: NavParams
  ) {
    this.coordenadas = this.navParams.get('ubicacion');
  }

  ionViewDidLoad() {
    this.getPosition();
  }
  getPosition(): any {
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    }).catch(error => {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Imposible acceder a la localizacion!',
        buttons: ['Aceptar']
      }).present();
    })
  }

  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    if (this.coordenadas) {
      let localizations: number[] = this.coordenadas.split(",");
      if (localizations.length == 2) {
        latitude = localizations[0];
        longitude = localizations[1];
      } else {
        this.alertCtrl.create({
          title: 'Message',
          subTitle: 'Imposible acceder a la localizacion!',
          buttons: ['Aceptar']
        }).present();
        this.closeModal();
      }
    }
    const location = new google.maps.LatLng(latitude, longitude);
    const options = {
      center: location,
      zoom: 15
    };
    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, map);
  }
  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
