import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageService} from "./services/storage/storage.service";
import {StorageKeys} from "./constants/constants";
import {DatetimeService} from "./services/datetime/datetime.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private datetimeService: DatetimeService,
    private storageService: StorageService
  ) {
    this.initializeApp().then(() => this.initialiseInstallDate());
  }

  async initializeApp(): Promise<void> {
    return await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initialiseInstallDate(): void {
    this.storageService.getFromLocalStorage(StorageKeys.INSTALL_DATE).then((value => {
      if(value){
        this.datetimeService.installDate = value;
      }else{
        this.storageService.saveToLocalStorage(StorageKeys.INSTALL_DATE, this.datetimeService.getCurrentDateTime());
      }
      this.datetimeService.todayDate = this.datetimeService.getCurrentDateTime();
    }))
  }
}
