import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
      private storageService: StorageService,
      private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  resetApp() {
    this.storageService.clearLocalStorage(true).then(() => {
      this.presentResetAlert();
    });
  }

  async presentResetAlert(){
    const alert = await this.alertController.create({
      id: 'appResetAlert',
      header: 'App reset successful !',
      buttons: ['OK']
    });
    await alert.present();
  }
}
