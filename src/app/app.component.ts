import { CreditosPage } from './../pages/creditos/creditos';
import { AyudaPage } from './../pages/ayuda/ayuda';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { RegistrosPage } from './../pages/registros/registros';
import { AjustesPage } from './../pages/ajustes/ajustes';
import { Component, ViewChild } from '@angular/core';
import { Platform ,Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;
  public helpers: Array<{ titulo: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController) {
    this.rootPage = HomePage;
    this.pages = [
      { titulo: 'Inicio', component: HomePage, icon: 'home' },     
      { titulo: 'Ajustes', component: AjustesPage, icon: 'construct' },
      { titulo: 'Mis Registros', component: RegistrosPage, icon: 'list-box' }
    ];
    this.helpers = [
      { titulo: 'Tutorial', component: TutorialPage, icon: 'videocam' },
      { titulo: 'Ayuda', component: AyudaPage, icon: 'information' },
      { titulo: 'Creditos', component: CreditosPage, icon: 'git-network' }     
    ];  
    platform.ready().then(() => {    
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToPage(page) {
    this.nav.setRoot(page);
  }   

}

