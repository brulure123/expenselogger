import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth'
import {AuthService} from "./services/auth/auth.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireAuthModule,
  ],
  providers: [
      AuthService
  ]
})
export class AuthModule { }
