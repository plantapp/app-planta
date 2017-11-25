import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrosPage } from './registros';

@NgModule({
  declarations: [
    RegistrosPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrosPage),
  ],
})
export class RegistrosPageModule {}
