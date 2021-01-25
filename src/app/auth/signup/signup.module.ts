import { AppFormsModule } from './../../core/modules/app-forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignupPageRoutingModule,
    AppFormsModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
