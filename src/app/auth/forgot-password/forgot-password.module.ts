import { AppFormsModule } from './../../core/modules/app-forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    AppFormsModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
