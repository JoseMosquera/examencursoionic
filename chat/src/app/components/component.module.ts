import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppLoadingFeedbackComponent } from './app-loading-feedback/app-loading-feedback.component';
import { MensajeComponent } from './mensaje/mensaje.component';



@NgModule({
  declarations: [
    AppLoadingFeedbackComponent,
    MensajeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    AppLoadingFeedbackComponent,
    MensajeComponent
  ]
})
export class ComponentModule { }
