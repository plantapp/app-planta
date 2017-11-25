import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePlantaPage } from './detalle-planta';

@NgModule({
  declarations: [
    DetallePlantaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePlantaPage),
  ],
})
export class DetallePlantaPageModule {}
