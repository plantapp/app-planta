import { Geolocation } from '@ionic-native/geolocation';
import { LocationPageModule } from './../pages/location/location.module';
import { WelcomePageModule } from './../pages/welcome/welcome.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera'
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from './../pages/login/login.module';
import { UsuarioPageModule } from './../pages/usuario/usuario.module';
import { TutorialPageModule } from './../pages/tutorial/tutorial.module';
import { RegistrosPageModule } from './../pages/registros/registros.module';
import { PerfilPageModule } from './../pages/perfil/perfil.module';
import { DetallePlantaPageModule } from './../pages/detalle-planta/detalle-planta.module';
import { CreditosPageModule } from './../pages/creditos/creditos.module';
import { CamaraPageModule } from './../pages/camara/camara.module';
import { AyudaPageModule } from './../pages/ayuda/ayuda.module';
import { AjustesPageModule } from './../pages/ajustes/ajustes.module';

import { SplitPane } from './../providers/common/split-pane';
import { Common } from './../providers/common/common';
import { AuthService } from './../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
  
    AjustesPageModule,
    AyudaPageModule,
    CamaraPageModule,
    CreditosPageModule,
    DetallePlantaPageModule,
    PerfilPageModule,
    RegistrosPageModule,
    TutorialPageModule,
    UsuarioPageModule,
    LoginPageModule,
    WelcomePageModule,
    LocationPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Common,
    SplitPane,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    Diagnostic
  ]
})
export class AppModule { }
